import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export interface ProfileFormData {
  name: string;
  age: number | null;
  gender: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  goal: string | null;
  experience: string | null;
  days_per_week: number | null;
  session_duration: string | null;
  location: string | null;
  equipment: string | null;
}

export function isProfileComplete(profile: ProfileFormData | null | undefined): boolean {
  return Boolean(profile?.name?.trim());
}

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    console.info("[getProfile] Fetching profile for userId:", userId);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      // Log the full error object for debugging
      console.error("getProfile error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        fullError: error
      });
      // If it's a network error, give a hint
      if (error?.message && error.message.includes("Failed to fetch")) {
        console.warn(
          "Network error contacting Supabase. Check your internet connection, " +
            "Supabase URL and anon key in .env.local, and that the Supabase project is active."
        );
      }
      // If the error is because no row was found (PGRST116), treat as no profile
      if (error.code === "PGRST116") {
        return null;
      }
      return null;
    }
    return data;
  } catch (err) {
    console.error("getProfile unexpected error:", err);
    // If it's a network error (TypeError: Failed to fetch), treat as missing profile
    if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
      console.warn("Network error (Failed to fetch) when fetching profile. Returning null.");
      return null;
    }
    return null;
  }
}

export async function upsertProfile(
  userId: string,
  data: ProfileFormData
): Promise<Profile | null> {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: userId,
          name: data.name,
          age: data.age,
          gender: data.gender,
          height_cm: data.height_cm,
          weight_kg: data.weight_kg,
          goal: data.goal,
          experience: data.experience,
          days_per_week: data.days_per_week,
          session_duration: data.session_duration,
          location: data.location,
          equipment: data.equipment,
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("upsertProfile error:", error);
      if (error?.message && error.message.includes("Failed to fetch")) {
        console.warn(
          "Network error contacting Supabase. Check your internet connection, " +
            "Supabase URL and anon key in .env.local, and that the Supabase project is active."
        );
      }
      return null;
    }
    return profile;
  } catch (err) {
    console.error("upsertProfile unexpected error:", err);
    return null;
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<ProfileFormData>
): Promise<Profile | null> {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("updateProfile error:", error);
      if (error?.message && error.message.includes("Failed to fetch")) {
        console.warn(
          "Network error contacting Supabase. Check your internet connection, " +
            "Supabase URL and anon key in .env.local, and that the Supabase project is active."
        );
      }
      return null;
    }
    return profile;
  } catch (err) {
    console.error("updateProfile unexpected error:", err);
    return null;
  }
}