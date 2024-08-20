import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mxyippuwkpysdexmxrbm.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14eWlwcHV3a3B5c2RleG14cmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5NzI1ODcsImV4cCI6MjAyNTU0ODU4N30.ed2YgcvYOoajEOc-NkcTpwW1Bhb79sWoRWKGHZDdxHM'; // Replace with your Supabase API key
export const supabase = createClient(supabaseUrl, supabaseKey);



