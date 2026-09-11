-- Copperhead production schema. Run in a Supabase PostgreSQL project before enabling account persistence.
create extension if not exists "pgcrypto";

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  states text[] default '{}',
  created_at timestamptz not null default now()
);

create table if not exists organization_members (
  organization_id uuid references organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner','admin','operations','measurement','commercial','advisor','viewer')),
  created_at timestamptz not null default now(),
  primary key (organization_id,user_id)
);

create table if not exists fields (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  name text not null,
  state text,
  county text,
  bopd numeric,
  bwpd numeric,
  mcfd numeric,
  created_at timestamptz default now()
);

create table if not exists leases (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  field_id uuid references fields(id) on delete set null,
  name text not null,
  producing_wells integer default 0,
  bopd numeric,
  bwpd numeric,
  corrected_api numeric,
  bsw_percent numeric,
  typical_temp_low_f numeric,
  typical_temp_high_f numeric,
  heated boolean,
  measurement_method text,
  data_source text default 'user_entered',
  created_at timestamptz default now()
);

create table if not exists wells (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  lease_id uuid references leases(id) on delete cascade,
  name text not null,
  regulatory_id text,
  status text,
  bopd numeric,
  bwpd numeric,
  mcfd numeric,
  lift_type text,
  tubing_pressure numeric,
  casing_pressure numeric,
  created_at timestamptz default now()
);

create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  lease_id uuid references leases(id) on delete cascade,
  name text not null,
  facility_type text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists measurement_points (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  lease_id uuid references leases(id) on delete cascade,
  facility_id uuid references facilities(id) on delete set null,
  name text not null,
  method text,
  meter_factor numeric,
  typical_temp_low_f numeric,
  typical_temp_high_f numeric,
  typical_pressure_psig numeric,
  last_proved_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists calculations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  lease_id uuid references leases(id) on delete set null,
  measurement_point_id uuid references measurement_points(id) on delete set null,
  calculation_type text not null,
  inputs jsonb not null,
  outputs jsonb not null,
  status text,
  created_by uuid,
  created_at timestamptz default now()
);

create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  lease_id uuid references leases(id) on delete set null,
  title text not null,
  counterparty text,
  retention_mode text default 'vault',
  current_version integer default 1,
  created_at timestamptz default now()
);

create table if not exists contract_versions (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid references contracts(id) on delete cascade not null,
  version_number integer not null,
  storage_path text,
  analysis jsonb,
  effective_date date,
  expiration_date date,
  created_at timestamptz default now(),
  unique(contract_id,version_number)
);

create table if not exists contract_obligations (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid references contracts(id) on delete cascade not null,
  obligation_type text,
  title text not null,
  due_at timestamptz,
  status text default 'open',
  source_clause text,
  created_at timestamptz default now()
);

create table if not exists intelligence_items (
  id uuid primary key default gen_random_uuid(),
  item_type text not null,
  state text,
  category text,
  title text not null,
  source_name text,
  source_url text not null,
  published_at timestamptz,
  summary text,
  relevance text,
  approved boolean default false,
  created_at timestamptz default now(),
  unique(source_url)
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade not null,
  lease_id uuid references leases(id) on delete set null,
  alert_type text not null,
  title text not null,
  detail text,
  severity text default 'medium',
  resolved_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  email text,
  phone text,
  topic text,
  message text,
  created_at timestamptz default now()
);

-- RLS should be enabled and policies should require organization membership before production use.
