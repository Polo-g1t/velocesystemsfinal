const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zeyefiqpfczqgsgdjlzz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_-nyj49eXzoMqS90bd3sWPw_thg8VvJW';

const supabase = createClient(supabaseUrl, supabaseKey);

const SQL_MIGRATION = `
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zeyefiqpfczqgsgdjlzz/sql/new

CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    username TEXT UNIQUE NOT NULL,
    default_password TEXT NOT NULL,
    password_hash TEXT,
    is_activated BOOLEAN DEFAULT FALSE,
    default_password_changed BOOLEAN DEFAULT FALSE,
    department TEXT DEFAULT 'Information Technology',
    position TEXT DEFAULT 'Frontend Software Engineer',
    role TEXT DEFAULT 'employee',
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) and permit public operations for the EMS app
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all public operations on employees" ON public.employees;
CREATE POLICY "Allow all public operations on employees"
ON public.employees
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Insert both users according to the final plan
INSERT INTO public.employees (
    employee_number, name, email, username, default_password, department, position, role, is_activated, default_password_changed
)
VALUES
    -- Employee Side (Polo C. Gonzalez)
    ('EMP-1042', 'Polo C. Gonzalez', 'gonzalezpolo256@gmail.com', 'pgonzalez', 'VeloceDefault#2026', 'Information Technology', 'Frontend Software Engineer', 'employee', false, false),

    -- Department Manager Side (Marcus Rivera)
    ('MGR-2001', 'Marcus Rivera', 'j7core256@gmail.com', 'mrivera', 'ManagerDefault#2026', 'Information Technology', 'IT Department Manager', 'manager', false, false)
ON CONFLICT (employee_number) DO UPDATE 
SET email = EXCLUDED.email, 
    name = EXCLUDED.name,
    username = EXCLUDED.username,
    default_password = EXCLUDED.default_password,
    department = EXCLUDED.department,
    position = EXCLUDED.position,
    role = EXCLUDED.role;
`;

async function seed() {
  console.log('Connecting to Supabase at:', supabaseUrl);

  const usersToInsert = [
    {
      employee_number: 'EMP-1042',
      name: 'Polo C. Gonzalez',
      email: 'gonzalezpolo256@gmail.com',
      username: 'pgonzalez',
      default_password: 'VeloceDefault#2026',
      department: 'Information Technology',
      position: 'Frontend Software Engineer',
      role: 'employee',
      is_activated: false,
      default_password_changed: false,
    },
    {
      employee_number: 'MGR-2001',
      name: 'Marcus Rivera',
      email: 'j7core256@gmail.com',
      username: 'mrivera',
      default_password: 'ManagerDefault#2026',
      department: 'Information Technology',
      position: 'IT Department Manager',
      role: 'manager',
      is_activated: false,
      default_password_changed: false,
    },
  ];

  let tableExists = true;
  for (const user of usersToInsert) {
    console.log(`Upserting ${user.name} (${user.employee_number})...`);
    const { data, error } = await supabase
      .from('employees')
      .upsert(user, { onConflict: 'employee_number' })
      .select();

    if (error) {
      if (error.message && error.message.includes('schema cache')) {
        tableExists = false;
        console.error(`\n[NOTICE] The 'public.employees' table does not exist yet in Supabase.`);
        console.error(`Please run the following SQL script once in your Supabase SQL Editor:`);
        console.log(SQL_MIGRATION);
        break;
      } else {
        console.error(`Error inserting ${user.employee_number}:`, error.message);
      }
    } else {
      console.log(`Successfully upserted:`, data);
    }
  }

  if (tableExists) {
    // Fetch all employees to verify
    const { data: allEmps, error: fetchErr } = await supabase
      .from('employees')
      .select('employee_number, name, email, username, position, department, role');

    if (fetchErr) {
      console.error('Fetch error:', fetchErr.message);
    } else {
      console.log('\nVerified employees in Supabase:');
      console.table(allEmps);
    }
  }
}

seed();
