-- profiles table
-- Linked to auth.users via user_id (one-to-one)
-- RLS ensures each user can only access their own profile

create table if not exists public.profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users(id) on delete cascade,
  name        text not null,
  age         integer,
  gender      text,
  height_cm   integer,
  weight_kg   numeric(5,1),
  goal        text,
  experience  text,
  days_per_week integer,
  session_duration text,
  location    text,
  equipment   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for fast lookup by user_id
create index if not exists profiles_user_id_idx on public.profiles (user_id);

-- Updated-at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;

-- Users can read their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = user_id);

-- Users can insert their own profile
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = user_id);

-- Users can update their own profile
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can delete their own profile
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
  on public.profiles
  for delete
  using (auth.uid() = user_id);