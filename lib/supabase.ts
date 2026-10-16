import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zeyefiqpfczqgsgdjlzz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_-nyj49eXzoMqS90bd3sWPw_thg8VvJW';

export const supabase = createClient(supabaseUrl, supabaseKey);
