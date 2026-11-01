const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { PGlite } = require("@electric-sql/pglite");
test("PostgreSQL migration and transactional payment/report/refund invariants", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      `create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key);create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit int,allowed_mime_types text[]);`,
    );
    const migration = fs
      .readFileSync("supabase/migrations/202611010001_portal.sql", "utf8")
      .replace("create extension if not exists pgcrypto;", "");
    await db.exec(migration);
    const actor = "11111111-1111-4111-8111-111111111111";
    await db.query("insert into auth.users values($1)", [actor]);
    await db.query("insert into admin_roles values($1)", [actor]);
    const payment = {
      customer_email: "alice@example.com",
      customer_name: "Alice",
      testers: 5,
      hours: 1,
      testing_type: "functionality",
      delivery: "standard",
      amount: 50,
      currency: "USD",
      paypal_order_id: "ORDER1",
      capture_id: "CAPTURE1",
    };
    const result = await db.query("select record_payment($1) as id", [payment]);
    const order = result.rows[0].id;
    await db.query("select record_payment($1)", [payment]);
    assert.equal((await db.query("select * from orders")).rows.length, 1);
    assert.equal(
      (await db.query("select * from email_notifications")).rows.length,
      2,
    );
    assert.equal(
      (await db.query("select * from payment_transactions")).rows.length,
      1,
    );
    await assert.rejects(
      db.query("select save_submission($1,$2,$3,$4)", [
        order,
        "intruder@example.com",
        { app_name: "Stolen" },
        null,
      ]),
    );
    await db.query("select save_submission($1,$2,$3,$4)", [
      order,
      "alice@example.com",
      { app_name: "My App" },
      "ciphertext",
    ]);
    await db.query("select update_testing($1,$2,$3,$4,$5)", [
      order,
      actor,
      "In Progress",
      "Testing now",
      actor,
    ]);
    await assert.rejects(
      db.query("select save_submission($1,$2,$3,$4)", [
        order,
        "alice@example.com",
        { app_name: "Late edit" },
        null,
      ]),
    );
    await assert.rejects(
      db.query("select update_testing($1,$2,$3,$4,$5)", [
        order,
        actor,
        "Completed",
        "",
        null,
      ]),
    );
    const report = (
      await db.query(
        "insert into qa_reports(order_id,filename,size,path,uploaded_by) values($1,$2,$3,$4,$5) returning id",
        [order, "report.pdf", 500, "private/report.pdf", actor],
      )
    ).rows[0].id;
    assert.equal(
      (await db.query("select * from report_deliveries")).rows.length,
      0,
    );
    await assert.rejects(
      db.query("select release_report($1,$2)", [
        report,
        "22222222-2222-4222-8222-222222222222",
      ]),
    );
    await db.query("select release_report($1,$2)", [report, actor]);
    await db.query("select release_report($1,$2)", [report, actor]);
    assert.equal(
      (await db.query("select * from report_deliveries")).rows.length,
      1,
    );
    assert.equal(
      (await db.query("select * from email_notifications")).rows.length,
      3,
    );
    await assert.rejects(
      db.query("select release_report($1,$2,true)", [report, actor]),
    );
    await db.query("select update_testing($1,$2,$3,$4,$5)", [
      order,
      actor,
      "Completed",
      "Reviewed and delivered",
      actor,
    ]);
    await db.query("select record_refund($1,$2,$3,$4,$5)", [
      "EVENT1",
      "CAPTURE1",
      "REFUND1",
      20,
      "USD",
    ]);
    await db.query("select record_refund($1,$2,$3,$4,$5)", [
      "EVENT1",
      "CAPTURE1",
      "REFUND1",
      20,
      "USD",
    ]);
    assert.equal(
      Number((await db.query("select refunded from orders")).rows[0].refunded),
      20,
    );
    await db.query("select record_refund($1,$2,$3,$4,$5)", [
      "EVENT2",
      "CAPTURE1",
      "REFUND2",
      30,
      "USD",
    ]);
    assert.equal(
      (await db.query("select payment_status from orders")).rows[0]
        .payment_status,
      "refunded",
    );
    await assert.rejects(
      db.query("select record_refund($1,$2,$3,$4,$5)", [
        "EVENT3",
        "CAPTURE1",
        "REFUND3",
        1,
        "USD",
      ]),
    );
    const claims = (await db.query("select * from claim_emails()")).rows;
    assert.equal(claims.length, 3);
    assert.equal(
      (await db.query("select * from claim_emails()")).rows.length,
      0,
    );
    for (let i = 0; i < 5; i++)
      assert.equal(
        (
          await db.query("select take_rate_limit($1,$2) as allowed", [
            "limited",
            5,
          ])
        ).rows[0].allowed,
        true,
      );
    assert.equal(
      (
        await db.query("select take_rate_limit($1,$2) as allowed", [
          "limited",
          5,
        ])
      ).rows[0].allowed,
      false,
    );
    await db.exec("set role anon");
    await assert.rejects(db.query("select * from orders"));
    await assert.rejects(db.query("select * from qa_reports"));
    await assert.rejects(db.query("select * from claim_emails()"));
  } finally {
    await db.close();
  }
});
