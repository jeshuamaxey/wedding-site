-- RSVP schema: guests (imported from the guest-list spreadsheet), per-day
-- attendance, dietary requirements, site-wide RSVP config, and an admin
-- allow-list used by RLS. Guest-facing reads/writes never touch this schema
-- directly with the anon key -- they go through server routes using the
-- service-role key, which bypasses RLS entirely. RLS here exists purely to
-- gate the admin-facing (Supabase Auth) access.

create extension if not exists pgcrypto;

create type guest_side as enum ('bride', 'groom');
create type invite_status as enum ('invited', 'reserve', 'not_invited');
create type dietary_option as enum (
  'none',
  'vegetarian',
  'vegan',
  'pescatarian',
  'gluten_free',
  'dairy_free',
  'nut_allergy',
  'halal',
  'kosher'
);

-- Site-wide RSVP config. Single row (id is always 1).
create table rsvp_settings (
  id int primary key default 1,
  rsvp_deadline timestamptz,
  rsvp_open boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint rsvp_settings_singleton check (id = 1)
);

insert into rsvp_settings (id) values (1);

-- The three days of the wedding weekend.
create table event_days (
  id smallint primary key,
  name text not null,
  event_date date not null,
  description text
);

insert into event_days (id, name, event_date, description) values
  (1, 'Welcome Drinks', '2027-08-26', 'Evening welcome drinks'),
  (2, 'Wedding Day', '2027-08-27', 'Ceremony and reception'),
  (3, 'Day-After Brunch', '2027-08-28', 'Farewell brunch');

-- One row per invitee as imported from the guest-list spreadsheet.
-- Plus-ones are already distinct rows in the source data (often with a
-- placeholder name like "Orla PLUS 1") rather than a separate concept here.
create table guests (
  id uuid primary key default gen_random_uuid(),
  invite_group_id int not null,
  full_name text not null,
  name_is_placeholder boolean not null default false,
  side guest_side,
  group_label text,
  invite_status invite_status not null default 'invited',
  kids_count int not null default 0,
  babies_count int not null default 0,
  kids_dietary_note text,
  -- Admin/planning-only fields carried through from the spreadsheet.
  address text,
  room_alloc text,
  room_subsidy_pct text,
  negotiable text,
  sent_std text,
  given_std text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index guests_invite_group_id_idx on guests (invite_group_id);
create index guests_invite_status_idx on guests (invite_status);

-- Per guest, per day attendance. Pre-seeded for every guest/day pair at
-- import time so "no response yet" is a row with attending = null, not a
-- missing row.
create table rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references guests (id) on delete cascade,
  event_day_id smallint not null references event_days (id),
  attending boolean,
  responded_at timestamptz,
  unique (guest_id, event_day_id)
);

create index rsvp_responses_guest_id_idx on rsvp_responses (guest_id);

-- One row per guest. Kids/babies attached to a guest share that guest's
-- kids_dietary_note free-text field rather than getting their own row.
create table dietary_requirements (
  guest_id uuid primary key references guests (id) on delete cascade,
  options dietary_option[] not null default '{}',
  notes text,
  updated_at timestamptz not null default now()
);

-- Allow-list of Supabase Auth users treated as admins (you and Sinead).
create table admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

alter table rsvp_settings enable row level security;
alter table event_days enable row level security;
alter table guests enable row level security;
alter table rsvp_responses enable row level security;
alter table dietary_requirements enable row level security;
alter table admins enable row level security;

-- No policies for anon/authenticated non-admin users on any table below --
-- RLS enabled with no matching policy denies access by default. Guest-facing
-- access happens exclusively through server routes using the service-role
-- key, which bypasses RLS entirely and validates the caller's session itself.

create policy "admin full access" on rsvp_settings for all using (is_admin()) with check (is_admin());
create policy "admin full access" on event_days for all using (is_admin()) with check (is_admin());
create policy "admin full access" on guests for all using (is_admin()) with check (is_admin());
create policy "admin full access" on rsvp_responses for all using (is_admin()) with check (is_admin());
create policy "admin full access" on dietary_requirements for all using (is_admin()) with check (is_admin());
create policy "admin manage admins" on admins for all using (is_admin()) with check (is_admin());
