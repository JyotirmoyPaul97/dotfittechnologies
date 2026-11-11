import { getProfile } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";

// Set environment variables (already set via .env.local when running via next dev, but we can set manually)
console.log("Testing getProfile with a random user id...");
const testUserId = "00000000-0000-0000-0000-000000000000";

getProfile(testUserId).then(profile => {
  console.log("Profile result:", profile);
}).catch(err => {
  console.error("Error:", err);
});