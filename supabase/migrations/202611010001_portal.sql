begin;
create extension if not exists pgcrypto;
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, name text not null default '', phone text not null default '', updated_at timestamptz not null default now());
create table public.admin_roles (user_id uuid primary key references auth.users(id));
create table public.orders (id uuid primary key default gen_random_uuid(), customer_email text not null, customer_name text not null default '', app_name text, testers int not null check(testers between 1 and 200), hours int not null check(hours between 1 and 10), testing_type text not null, delivery text not null, amount numeric(12,2) not null check(amount>0), refunded numeric(12,2) not null default 0 check(refunded>=0 and refunded<=amount), currency text not null check(currency='USD'), payment_status text not null default 'paid', status text not null default 'Awaiting App Details' check(status in ('Awaiting App Details','Ready for Testing','In Progress','QA Report Preparation','QA Review','Completed','Cancelled')), paypal_order_id text not null unique, capture_id text not null unique, assigned_to uuid references public.admin_roles(user_id), internal_notes text not null default '', created_at timestamptz not null default now());
create index orders_customer on public.orders(lower(customer_email));
create index orders_status_date on public.orders(status,created_at);
create table public.checkout_intents (id uuid primary key default gen_random_uuid(), configuration jsonb not null, paypal_order_id text unique, created_at timestamptz not null default now());
create table public.payment_transactions (id text primary key, order_id uuid not null references public.orders(id), kind text not null check(kind in ('capture','refund')), amount numeric(12,2) not null check(amount>0), currency text not null, created_at timestamptz not null default now());
create table public.paypal_webhook_events (id text primary key, event_type text not null, processed_at timestamptz not null default now());
create table public.app_submissions (order_id uuid primary key references public.orders(id), details jsonb not null, encrypted_credentials text, updated_at timestamptz not null default now());
create table public.testing_status_history (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id), status text not null, actor_id uuid references auth.users(id), created_at timestamptz not null default now());
create table public.testing_assignments (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id), assigned_to uuid not null references public.admin_roles(user_id), assigned_by uuid not null references auth.users(id), created_at timestamptz not null default now());
create table public.qa_reports (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id), filename text not null, size int not null check(size between 1 and 20971520), path text unique not null, uploaded_by uuid not null references public.admin_roles(user_id), created_at timestamptz not null default now(), approved_at timestamptz, released_at timestamptz, downloaded_at timestamptz);
create table public.report_deliveries (id uuid primary key default gen_random_uuid(), report_id uuid not null references public.qa_reports(id), attempt int not null default 1, approved_by uuid not null references public.admin_roles(user_id), status text not null default 'queued', created_at timestamptz not null default now(), unique(report_id,attempt));
create table public.messages (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id), sender_id uuid not null references auth.users(id), sender_email text not null, admin boolean not null, body text not null check(length(body) between 1 and 5000), read_at timestamptz, created_at timestamptz not null default now());
create index messages_order on public.messages(order_id,created_at);
create table public.email_notifications (id uuid primary key default gen_random_uuid(), dedupe_key text unique not null, recipient text not null, subject text not null, payload jsonb not null, status text not null default 'queued', attempts int not null default 0, provider_id text, available_at timestamptz not null default now(), locked_at timestamptz, created_at timestamptz not null default now(), accepted_at timestamptz, last_error text);
create table public.audit_logs (id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id), action text not null, order_id uuid references public.orders(id), details jsonb, created_at timestamptz not null default now());
create table public.rate_limits (key text primary key, count int not null, reset_at timestamptz not null);
-- No client has direct access: all reads pass validated identity and ownership checks on the server.
do $$ declare t text; begin foreach t in array array['profiles','admin_roles','orders','checkout_intents','payment_transactions','paypal_webhook_events','app_submissions','testing_status_history','testing_assignments','qa_reports','report_deliveries','messages','email_notifications','audit_logs','rate_limits'] loop execute format('alter table public.%I enable row level security',t); execute format('revoke all on public.%I from anon, authenticated',t); end loop; end $$;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('qa-reports','qa-reports',false,20971520,array['application/pdf']) on conflict(id) do nothing;
create function public.take_rate_limit(p_key text,p_limit int) returns boolean language plpgsql security definer set search_path=public as $$ declare n int; begin insert into rate_limits values(p_key,1,now()+interval '10 minutes') on conflict(key) do update set count=case when rate_limits.reset_at<now() then 1 else rate_limits.count+1 end, reset_at=case when rate_limits.reset_at<now() then now()+interval '10 minutes' else rate_limits.reset_at end returning count into n; return n<=p_limit; end $$;
create function public.record_payment(p_order jsonb) returns uuid language plpgsql security definer set search_path=public as $$ declare oid uuid; begin
 insert into orders(customer_email,customer_name,testers,hours,testing_type,delivery,amount,currency,paypal_order_id,capture_id,created_at) values(lower(p_order->>'customer_email'),p_order->>'customer_name',(p_order->>'testers')::int,(p_order->>'hours')::int,p_order->>'testing_type',p_order->>'delivery',(p_order->>'amount')::numeric,p_order->>'currency',p_order->>'paypal_order_id',p_order->>'capture_id',coalesce((p_order->>'paid_at')::timestamptz,now())) on conflict(paypal_order_id) do nothing returning id into oid;
 if oid is null then select id into oid from orders where paypal_order_id=p_order->>'paypal_order_id'; return oid; end if;
 insert into payment_transactions(id,order_id,kind,amount,currency) values(p_order->>'capture_id',oid,'capture',(p_order->>'amount')::numeric,p_order->>'currency');
 insert into testing_status_history(order_id,status) values(oid,'Awaiting App Details');
 insert into email_notifications(dedupe_key,recipient,subject,payload) values('payment-admin:'||oid,'support@testflighttesters.com','New TestFlightTesters Order — '||oid,jsonb_build_object('kind','payment-admin','order',p_order||jsonb_build_object('id',oid))),('payment-client:'||oid,p_order->>'customer_email','Payment Confirmed — Your TestFlightTesters Order',jsonb_build_object('kind','payment-client','order',p_order||jsonb_build_object('id',oid)));
 return oid; end $$;
create function public.record_refund(p_event text,p_capture text,p_id text,p_amount numeric,p_currency text) returns void language plpgsql security definer set search_path=public as $$ declare o orders; begin
 select * into o from orders where capture_id=p_capture for update; if not found then raise exception 'Unknown capture'; end if;
 if p_currency<>o.currency or p_amount<=0 then raise exception 'Invalid refund'; end if;
 if exists(select 1 from payment_transactions where id=p_id) then return; end if;
 insert into payment_transactions values(p_id,o.id,'refund',p_amount,p_currency,now());
 update orders set refunded=refunded+p_amount,payment_status=case when refunded+p_amount=amount then 'refunded' else 'partially refunded' end where id=o.id;
 insert into paypal_webhook_events(id,event_type) values(p_event,'PAYMENT.CAPTURE.REFUNDED') on conflict do nothing;
 end $$;
create function public.release_report(p_report uuid,p_actor uuid,p_resend boolean default false) returns void language plpgsql security definer set search_path=public as $$ declare r qa_reports; o orders; n int; begin
 if not exists(select 1 from admin_roles where user_id=p_actor) then raise exception 'Forbidden'; end if;
 select * into r from qa_reports where id=p_report for update; if not found then raise exception 'Report missing'; end if;
 select * into o from orders where id=r.order_id; if o.payment_status='refunded' then raise exception 'Refunded order'; end if;
 if r.released_at is not null and not p_resend then return; end if;
 select coalesce(max(attempt),0)+1 into n from report_deliveries where report_id=r.id;
 if n>1 and exists(select 1 from report_deliveries where report_id=r.id and created_at>now()-interval '10 minutes') then raise exception 'Please wait before resending'; end if;
 update qa_reports set approved_at=coalesce(approved_at,now()),released_at=coalesce(released_at,now()) where id=r.id;
 insert into report_deliveries(report_id,attempt,approved_by) values(r.id,n,p_actor);
 insert into email_notifications(dedupe_key,recipient,subject,payload) values('report:'||r.id||':'||n,o.customer_email,'Your TestFlightTesters QA Report Is Ready',jsonb_build_object('kind','report','report_id',r.id,'attempt',n,'order',to_jsonb(o),'filename',r.filename));
 insert into audit_logs(actor_id,action,order_id,details) values(p_actor,'Report approved and delivery queued',o.id,jsonb_build_object('report_id',r.id,'attempt',n));
 end $$;
create function public.claim_emails() returns setof email_notifications language sql security definer set search_path=public as $$ update email_notifications set status='sending',locked_at=now(),attempts=attempts+1 where id in(select id from email_notifications where (status in ('queued','failed') or (status='sending' and locked_at<now()-interval '5 minutes')) and attempts<5 and available_at<=now() order by created_at for update skip locked limit 20) returning * $$;
-- Make app edits and state changes mutually exclusive on the order row.
create function public.save_submission(p_order uuid,p_email text,p_details jsonb,p_credentials text) returns void language plpgsql security definer set search_path=public as $$ declare o orders; begin
 select * into o from orders where id=p_order for update;
 if o.id is null or lower(o.customer_email)<>lower(p_email) or o.status not in ('Awaiting App Details','Ready for Testing') or o.payment_status<>'paid' then raise exception 'Order cannot be edited'; end if;
 insert into app_submissions(order_id,details,encrypted_credentials) values(p_order,p_details,p_credentials) on conflict(order_id) do update set details=p_details,encrypted_credentials=coalesce(p_credentials,app_submissions.encrypted_credentials),updated_at=now();
 update orders set app_name=p_details->>'app_name',status='Ready for Testing' where id=p_order;
 insert into testing_status_history(order_id,status) values(p_order,'Ready for Testing'); end $$;
create function public.update_testing(p_order uuid,p_actor uuid,p_status text,p_notes text,p_assigned uuid) returns void language plpgsql security definer set search_path=public as $$ declare o orders; begin
 if not exists(select 1 from admin_roles where user_id=p_actor) then raise exception 'Forbidden'; end if;
 select * into o from orders where id=p_order for update;
 if p_status='Completed' and not exists(select 1 from qa_reports where order_id=p_order and released_at is not null) then raise exception 'Release a report before completing'; end if;
 update orders set status=p_status,internal_notes=p_notes,assigned_to=p_assigned where id=p_order;
 if o.status<>p_status then insert into testing_status_history(order_id,status,actor_id) values(p_order,p_status,p_actor); end if;
 if p_assigned is not null and p_assigned is distinct from o.assigned_to then insert into testing_assignments(order_id,assigned_to,assigned_by) values(p_order,p_assigned,p_actor); end if;
 insert into audit_logs(actor_id,action,order_id,details) values(p_actor,'Testing updated',p_order,jsonb_build_object('status',p_status,'assigned_to',p_assigned)); end $$;
revoke execute on function public.take_rate_limit(text,int),public.record_payment(jsonb),public.record_refund(text,text,text,numeric,text),public.release_report(uuid,uuid,boolean),public.claim_emails(),public.save_submission(uuid,text,jsonb,text),public.update_testing(uuid,uuid,text,text,uuid) from public,anon,authenticated;
grant execute on function public.take_rate_limit(text,int),public.record_payment(jsonb),public.record_refund(text,text,text,numeric,text),public.release_report(uuid,uuid,boolean),public.claim_emails(),public.save_submission(uuid,text,jsonb,text),public.update_testing(uuid,uuid,text,text,uuid) to service_role;
commit;
