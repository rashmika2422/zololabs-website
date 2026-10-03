-- Apply in your project's SQL Editor or with the Supabase migration CLI.
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 3 and 120),
  company text check (char_length(company) <= 120),
  message text not null check (char_length(message) between 20 and 2000),
  source text not null default 'website/contact',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notification_channel text not null check (notification_channel in ('email', 'webhook', 'none')),
  notification_status text not null check (notification_status in ('pending', 'processing', 'sent', 'failed', 'disabled')),
  notification_attempts integer not null default 0 check (notification_attempts >= 0),
  notification_started_at timestamptz,
  notification_next_attempt_at timestamptz not null default now(),
  notification_sent_at timestamptz,
  notification_error text
);

create index inquiries_created_at_idx on public.inquiries (created_at desc);
create index inquiries_notification_queue_idx
  on public.inquiries (notification_status, notification_next_attempt_at)
  where notification_status in ('pending', 'processing', 'failed');

-- Public visitors, including signed-in visitors, cannot access inquiry records.
-- The Next.js server writes using a server-only secret key.
alter table public.inquiries enable row level security;
revoke all on table public.inquiries from public, anon, authenticated, service_role;
grant select, insert, update on table public.inquiries to service_role;
