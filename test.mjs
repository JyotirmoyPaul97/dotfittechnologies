import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cxtjhfmijbhmuxathhpu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_BTH5YwMRq9qMxSsBCjBJKQ_6BXDpsWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Testing sign up and getProfile...');

const testEmail = `test_${Date.now()}@test.com`;
const testPassword = 'TestPassword123!';

async function runTest() {
  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (signUpError) {
      console.error('Sign up error:', signUpError);
      return;
    }

    console.log('Sign up successful:', signUpData);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Get session error:', sessionError);
      return;
    }

    console.log('Session:', sessionData.session?.user.id);

    const userId = sessionData.session?.user.id;
    if (!userId) {
      console.error('No user ID in session');
      return;
    }

    // Now call getProfile from our lib
    // We need to import the getProfile function. Since we are in an ES module, we can import from the compiled js? Let's instead replicate the function here.
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 means no rows returned (which is expected if profile not inserted)
      console.error('Profile fetch error:', profileError);
    }

    console.log('Profile data (should be null if not inserted):', profileData);

    // Optionally, we can insert a test profile using the upsert function from our lib, but we skip for now.

    // Clean up: delete the test user (requires service role or admin). We'll skip.
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

runTest();