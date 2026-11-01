const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const original = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  if (name.startsWith("@/")) name = path.join(process.cwd(), name.slice(2));
  return original.call(this, name, ...args);
};
let cookieToken;
const load = Module._load;
Module._load = function (name, ...args) {
  if (name === "server-only") return {};
  if (name === "next/headers")
    return {
      cookies: async () => ({
        get: () => (cookieToken ? { value: cookieToken } : undefined),
      }),
    };
  return load.call(this, name, ...args);
};
require.extensions[".ts"] = (mod, file) =>
  mod._compile(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    file,
  );
const { price, ownOrder, canEdit } = require("../lib/portal/model.ts");
const server = require("../lib/portal/server.ts");
const { persistPayment } = require("../lib/portal/paypal.ts");
const webhook = require("../app/api/webhooks/paypal/route.ts");
const ordersRoute = require("../app/api/portal/orders/[id]/route.ts");
const reportRoute = require("../app/api/portal/reports/[id]/route.ts");
const id = "11111111-1111-4111-8111-111111111111";
let calls = [];
const json = (data, status = 200) => Response.json(data, { status });
beforeEach(() => {
  cookieToken = undefined;
  calls = [];
  Object.assign(process.env, {
    APP_URL: "https://test.example",
    SUPABASE_URL: "https://db.example",
    SUPABASE_SERVICE_ROLE_KEY: "service",
    SUPABASE_ANON_KEY: "anon",
    PAYPAL_ENVIRONMENT: "sandbox",
    PAYPAL_CLIENT_ID: "client",
    PAYPAL_CLIENT_SECRET: "secret",
    PAYPAL_MERCHANT_ID: "merchant",
    PAYPAL_WEBHOOK_ID: "hook",
    TEST_CREDENTIALS_KEY: "ab".repeat(32),
  });
});
test("calculator regression: every supported tester/hour/delivery combination preserves current formula", () => {
  for (let testers = 1; testers <= 200; testers++)
    for (let hours = 1; hours <= 10; hours++)
      for (const [delivery, surcharge] of [
        ["standard", 0],
        ["priority", 2],
        ["express", 5],
      ])
        assert.equal(
          price({ testers, hours, delivery, type: "functionality" }),
          testers * (10 * hours + surcharge),
        );
});
test("price rejects tampered and out of range input", () => {
  for (const bad of [
    { testers: 0 },
    { testers: 201 },
    { hours: 0 },
    { hours: 11 },
    { testers: 1.5 },
    { delivery: "free" },
    { type: "other" },
  ])
    assert.throws(() =>
      price({
        testers: 5,
        hours: 1,
        delivery: "standard",
        type: "functionality",
        ...bad,
      }),
    );
});
test("ownership requires the verified email; instruction edits stop when testing starts", () => {
  assert(ownOrder({ customer_email: "A@EXAMPLE.COM" }, "a@example.com"));
  assert(!ownOrder({ customer_email: "a@example.com" }, "b@example.com"));
  assert(canEdit("Ready for Testing"));
  for (const s of ["In Progress", "Completed", "Cancelled", "QA Review"])
    assert(!canEdit(s));
});
test("unauthenticated order access fails before reading storage", async () => {
  global.fetch = () => {
    throw Error("Must not fetch");
  };
  await assert.rejects(server.session(), (e) => e.status === 401);
});
test("customer cannot access another order and ordinary users cannot become administrators", async () => {
  cookieToken = "valid";
  global.fetch = async (url) => {
    if (url.includes("/auth/"))
      return json({
        id,
        email: "alice@example.com",
        email_confirmed_at: "now",
      });
    if (url.includes("admin_roles")) return json([]);
    return json([{ id, customer_email: "bob@example.com" }]);
  };
  const user = await server.session();
  await assert.rejects(server.orderFor(id, user), (e) => e.status === 404);
  await assert.rejects(server.session(true), (e) => e.status === 403);
});
test("cross-origin mutations are rejected", () =>
  assert.throws(
    () =>
      server.csrf(
        new Request("https://test.example/api/orders", {
          headers: { origin: "https://evil.example" },
        }),
      ),
    (e) => e.status === 403,
  ));
function paymentFetch({
  status = "COMPLETED",
  amount = "50.00",
  merchant = "merchant",
  currency = "USD",
  intent = true,
} = {}) {
  return async (url, init = {}) => {
    calls.push([String(url), init]);
    if (url.includes("oauth2")) return json({ access_token: "paypal" });
    if (url.includes("/v2/checkout/orders/"))
      return json({
        id: "PAYPALORDER12345",
        status,
        payer: {
          email_address: "verified@example.com",
          name: { given_name: "Customer" },
        },
        purchase_units: [
          {
            custom_id: id,
            payee: { merchant_id: merchant },
            payments: {
              captures: [
                {
                  id: "CAPTURE12345",
                  status: "COMPLETED",
                  amount: { value: amount, currency_code: currency },
                },
              ],
            },
          },
        ],
      });
    if (url.includes("checkout_intents"))
      return json(
        intent
          ? [
              {
                id,
                configuration: {
                  testers: 5,
                  hours: 1,
                  delivery: "standard",
                  type: "functionality",
                },
              },
            ]
          : [],
      );
    if (url.includes("record_payment")) return json(id);
    throw Error(`Unexpected ${url}`);
  };
}
test("only a completed matching merchant capture creates a persistent order", async () => {
  global.fetch = paymentFetch();
  assert.equal(await persistPayment("PAYPALORDER12345"), id);
  const write = calls.find(([url]) => url.includes("record_payment"));
  assert(write);
  assert.equal(
    JSON.parse(write[1].body).p_order.customer_email,
    "verified@example.com",
  );
});
test("approved, underpaid, wrong-currency, foreign-merchant and unbound payments cannot create orders", async () => {
  for (const bad of [
    { status: "APPROVED" },
    { amount: "1.00" },
    { merchant: "attacker" },
    { currency: "EUR" },
    { intent: false },
  ]) {
    calls = [];
    global.fetch = paymentFetch(bad);
    await assert.rejects(persistPayment("PAYPALORDER12345"));
    assert(!calls.some(([url]) => url.includes("record_payment")));
  }
});
test("invalid webhook signature fails without database or payment mutation", async () => {
  global.fetch = async (url) => {
    calls.push(String(url));
    if (url.includes("oauth2")) return json({ access_token: "paypal" });
    return json({ verification_status: "FAILURE" });
  };
  const res = await webhook.POST(
    new Request("https://test.example/api/webhooks/paypal", {
      method: "POST",
      body: JSON.stringify({
        id: "EVENT-1",
        event_type: "PAYMENT.CAPTURE.COMPLETED",
      }),
    }),
  );
  assert.equal(res.status, 401);
  assert(!calls.some((u) => u.includes("/rest/")));
});
test("duplicate verified webhook is acknowledged without reprocessing or emailing", async () => {
  global.fetch = async (url) => {
    calls.push(String(url));
    if (url.includes("oauth2")) return json({ access_token: "paypal" });
    if (url.includes("verify-webhook"))
      return json({ verification_status: "SUCCESS" });
    if (url.includes("paypal_webhook_events")) return json([{ id: "EVENT-1" }]);
    throw Error("Duplicate must not process");
  };
  const res = await webhook.POST(
    new Request("https://test.example/api/webhooks/paypal", {
      method: "POST",
      body: JSON.stringify({
        id: "EVENT-1",
        event_type: "PAYMENT.CAPTURE.COMPLETED",
      }),
    }),
  );
  assert.equal(res.status, 200);
  assert(!calls.some((u) => u.includes("record_payment")));
});
function customerFetch({ admin = false, released = false } = {}) {
  cookieToken = "valid";
  return async (url, init = {}) => {
    calls.push([String(url), init]);
    if (url.includes("/auth/"))
      return json({
        id,
        email: "alice@example.com",
        email_confirmed_at: "now",
      });
    if (url.includes("admin_roles"))
      return json(admin ? [{ user_id: id }] : []);
    if (url.includes("qa_reports"))
      return json([
        {
          id,
          order_id: id,
          released_at: released ? "now" : null,
          filename: "report.pdf",
          path: "private/report.pdf",
        },
      ]);
    if (url.includes("orders?"))
      return json([
        {
          id,
          customer_email: "alice@example.com",
          status: "In Progress",
          payment_status: "paid",
        },
      ]);
    if (url.includes("take_rate_limit")) return json(true);
    throw Error(`Unexpected fetch ${url}`);
  };
}
test("customer instruction updates are rejected after testing starts", async () => {
  global.fetch = customerFetch();
  const res = await ordersRoute.POST(
    new Request("https://test.example/api", {
      method: "POST",
      headers: {
        origin: "https://test.example",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "submission" }),
    }),
    { params: Promise.resolve({ id }) },
  );
  assert.equal(res.status, 409);
  assert(!calls.some(([u]) => u.includes("save_submission")));
});
test("unreleased PDFs are invisible to customer; customers cannot release reports", async () => {
  global.fetch = customerFetch();
  const res = await reportRoute.GET(new Request("https://test.example/api"), {
    params: Promise.resolve({ id }),
  });
  assert.equal(res.status, 404);
  assert(!calls.some(([u]) => u.includes("/storage/")));
  global.fetch = customerFetch({ released: true });
  const release = await reportRoute.POST(
    new Request("https://test.example/api", {
      method: "POST",
      headers: { origin: "https://test.example" },
      body: "{}",
    }),
    { params: Promise.resolve({ id }) },
  );
  assert.equal(release.status, 403);
});
test("administrator must confirm the correct report and customer before release", async () => {
  global.fetch = customerFetch({ admin: true });
  const res = await reportRoute.POST(
    new Request("https://test.example/api", {
      method: "POST",
      headers: { origin: "https://test.example" },
      body: JSON.stringify({
        confirm: true,
        email: "wrong@example.com",
        filename: "report.pdf",
      }),
    }),
    { params: Promise.resolve({ id }) },
  );
  assert.equal(res.status, 400);
  assert(!calls.some(([u]) => u.includes("release_report")));
});
test("test credentials are authenticated ciphertext, never stored in plaintext", () => {
  const encrypted = server.encrypt("test-password");
  assert(!encrypted.includes("test-password"));
  const parts = encrypted.split(".");
  assert.equal(parts.length, 3);
  assert.equal(Buffer.from(parts[0], "base64").length, 12);
  assert.equal(Buffer.from(parts[1], "base64").length, 16);
});

test('admin PDF upload remains private and does not release a report or queue an email', async()=>{const base=customerFetch({admin:true});global.fetch=async(url,init={})=>{if(String(url).includes('/storage/')){calls.push([String(url),init]);return json({Key:'private'});}if(String(url).includes('/rest/v1/qa_reports')&&init.method==='POST'){calls.push([String(url),init]);return json([{id}]);}if(String(url).includes('audit_logs'))return json([]);return base(url,init);};const form=new FormData();form.set('file',new File(['%PDF-1.7\nexample test fixture'],'report.pdf',{type:'application/pdf'}));const response=await ordersRoute.POST(new Request('https://test.example/api',{method:'POST',headers:{origin:'https://test.example'},body:form}),{params:Promise.resolve({id})});assert.equal(response.status,200);assert(calls.some(([url,init])=>url.includes('/storage/')&&init.method==='POST'));assert(!calls.some(([url])=>url.includes('release_report')||url.includes('email_notifications')));});
test('non-PDF upload is rejected before private storage',async()=>{global.fetch=customerFetch({admin:true});const form=new FormData();form.set('file',new File(['<html>bad</html>'],'report.pdf',{type:'application/pdf'}));const response=await ordersRoute.POST(new Request('https://test.example/api',{method:'POST',headers:{origin:'https://test.example'},body:form}),{params:Promise.resolve({id})});assert.equal(response.status,400);assert(!calls.some(([url])=>url.includes('/storage/')));});
test('report release queues only after explicit correct confirmation',async()=>{const base=customerFetch({admin:true});global.fetch=async(url,init={})=>{if(String(url).includes('release_report')){calls.push([String(url),init]);return json(null);}return base(url,init);};const response=await reportRoute.POST(new Request('https://test.example/api',{method:'POST',headers:{origin:'https://test.example'},body:JSON.stringify({confirm:true,email:'alice@example.com',filename:'report.pdf'})}),{params:Promise.resolve({id})});assert.equal(response.status,200);assert(calls.some(([url])=>url.includes('release_report')));});
test('email provider failures persist retry state rather than claiming delivery',async()=>{const {processEmails}=require('../lib/portal/email.ts');process.env.RESEND_API_KEY='test-provider';process.env.EMAIL_FROM='support@example.com';global.fetch=async(url,init={})=>{calls.push([String(url),init]);if(String(url).includes('claim_emails'))return json([{id,dedupe_key:'report-test',recipient:'alice@example.com',subject:'Report ready',attempts:1,payload:{kind:'report',report_id:id,attempt:1,order:{id,app_name:'Test App'}}}]);if(String(url).includes('api.resend.com'))return json({error:'temporarily unavailable'},503);return json([]);};assert.equal(await processEmails(),1);const writes=calls.filter(([u,init])=>u.includes('email_notifications')&&init.method==='PATCH').map(([,init])=>JSON.parse(init.body));assert(writes.some(w=>w.status==='failed'&&w.available_at));assert(!writes.some(w=>w.status==='accepted'));delete process.env.RESEND_API_KEY;});
