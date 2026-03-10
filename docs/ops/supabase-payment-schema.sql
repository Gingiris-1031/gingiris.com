create extension if not exists pgcrypto;

create table if not exists public.orders (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  locale text not null default 'zh',
  plan_code text not null,
  plan_name_snapshot text not null,
  amount_cny integer not null check (amount_cny >= 0),
  currency text not null default 'CNY',
  payment_channel text not null check (payment_channel in ('wechat', 'alipay')),
  payment_provider text not null,
  status text not null check (status in ('pending_payment', 'processing', 'paid', 'failed', 'cancelled', 'fulfilled')),
  provider_order_id text,
  provider_trade_no text,
  product_link text,
  delivery_notes text,
  paid_at timestamptz,
  fulfilled_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_results (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders (id) on delete cascade,
  provider text not null,
  provider_event_id text not null unique,
  provider_trade_no text,
  status text not null,
  raw_payload jsonb not null,
  confirmed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists orders_user_created_at_idx on public.orders (user_id, created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_provider_order_idx on public.orders (provider_order_id);
create index if not exists payment_results_order_created_idx on public.payment_results (order_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

alter table public.orders enable row level security;
alter table public.payment_results enable row level security;

drop policy if exists orders_service_role_all on public.orders;
create policy orders_service_role_all
on public.orders
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists payment_results_service_role_all on public.payment_results;
create policy payment_results_service_role_all
on public.payment_results
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
