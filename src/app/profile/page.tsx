"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { updateProfile, ProfileFormData } from "@/lib/profiles";
import { useAuth } from "@/contexts/AuthContext";
import { AppHeader } from "@/components/layout/AppHeader";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import {
  DURATION_OPTIONS,
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS,
  LOCATION_OPTIONS,
} from "@/lib/profile-options";

const emptyForm: ProfileFormData = {
  name: "",
  age: null,
  gender: "",
  height_cm: null,
  weight_kg: null,
  goal: "",
  experience: "",
  days_per_week: null,
  session_duration: "",
  location: "",
  equipment: "",
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, isConfigured, profile, profileLoading, loadProfile, signOut } =
    useAuth();
  const [formData, setFormData] = useState<ProfileFormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (profileLoading || !profile) return;
    setFormData({
      name: profile.name ?? "",
      age: profile.age ?? null,
      gender: profile.gender ?? "",
      height_cm: profile.height_cm ?? null,
      weight_kg: profile.weight_kg ?? null,
      goal: profile.goal ?? "",
      experience: profile.experience ?? "",
      days_per_week: profile.days_per_week ?? null,
      session_duration: profile.session_duration ?? "",
      location: profile.location ?? "",
      equipment: profile.equipment ?? "",
    });
  }, [profile, profileLoading]);

  const handleChange = (field: keyof ProfileFormData, value: string | number | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === "" ? null : value,
    }));
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured) {
      setError("Supabase is not configured");
      return;
    }
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    if (!formData.name?.trim()) {
      setError("Name is required");
      return;
    }
    if (formData.age === null || formData.age < 13 || formData.age > 120) {
      setError("Please enter a valid age between 13 and 120");
      return;
    }
    if (!formData.gender) {
      setError("Please select your gender");
      return;
    }
    if (formData.height_cm === null || formData.height_cm < 100 || formData.height_cm > 250) {
      setError("Please enter a valid height between 100cm and 250cm");
      return;
    }
    if (formData.weight_kg === null || formData.weight_kg < 30 || formData.weight_kg > 300) {
      setError("Please enter a valid weight between 30kg and 300kg");
      return;
    }
    if (!formData.goal?.trim()) {
      setError("Please select your primary fitness goal");
      return;
    }
    if (!formData.experience?.trim()) {
      setError("Please select your training experience");
      return;
    }
    if (formData.days_per_week === null || formData.days_per_week < 1 || formData.days_per_week > 7) {
      setError("Please enter valid training days per week (1-7)");
      return;
    }
    if (!formData.session_duration?.trim()) {
      setError("Please select your preferred workout duration");
      return;
    }
    if (!formData.location?.trim()) {
      setError("Please specify if you train at gym or home");
      return;
    }
    if (!formData.equipment?.trim()) {
      setError("Please select your available equipment");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await updateProfile(user.id, formData);
      if (result) {
        setSuccess(true);
        await loadProfile();
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setDeleting(true);
    setError(null);

    try {
      const result = await signOut();
      if (result.error) {
        setError(result.error);
        return;
      }
      router.replace("/");
    } catch {
      setError("Failed to sign out. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b]">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-[#ccff00]" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b]">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-[#ff6b6b]" />
          <p className="text-sm text-gray-400">
            Supabase is not configured. Please check your environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b] text-gray-400">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080b]">
      <AppHeader />
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>

          {success && (
            <div className="mb-6 flex w-full items-center rounded-lg border border-[#ccff00]/30 bg-[#ccff00]/20 p-4">
              <CheckCircle2 className="mr-3 h-5 w-5 text-[#ccff00]" />
              <span className="text-xs font-medium text-[#ccff00]">Profile updated successfully!</span>
            </div>
          )}

          {error && (
            <div className="mb-6 flex w-full items-center rounded-lg border border-[#ff6b6b]/30 bg-[#ff6b6b]/20 p-4 text-sm text-[#ff6b6b]">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-black/30 p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">Profile Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField label="Full Name" htmlFor="name">
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name ?? ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={fieldClass}
                  required
                  autoComplete="name"
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Age" htmlFor="age">
                  <input
                    id="age"
                    type="number"
                    min="13"
                    max="120"
                    placeholder="Enter your age"
                    value={formData.age ?? ""}
                    onChange={(e) => handleChange("age", e.target.value ? Number(e.target.value) : null)}
                    className={fieldClass}
                    required
                  />
                </FormField>
                <FormField label="Gender" htmlFor="gender">
                  <select
                    id="gender"
                    value={formData.gender ?? ""}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className={fieldClass}
                    required
                  >
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Height (cm)" htmlFor="height">
                  <input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    placeholder="Enter your height in cm"
                    value={formData.height_cm ?? ""}
                    onChange={(e) =>
                      handleChange("height_cm", e.target.value ? Number(e.target.value) : null)
                    }
                    className={fieldClass}
                    required
                  />
                </FormField>
                <FormField label="Weight (kg)" htmlFor="weight">
                  <input
                    id="weight"
                    type="number"
                    min="30"
                    max="300"
                    placeholder="Enter your weight in kg"
                    value={formData.weight_kg ?? ""}
                    onChange={(e) =>
                      handleChange("weight_kg", e.target.value ? Number(e.target.value) : null)
                    }
                    className={fieldClass}
                    required
                  />
                </FormField>
              </div>

              <FormField label="Primary Fitness Goal" htmlFor="goal">
                <select
                  id="goal"
                  value={formData.goal ?? ""}
                  onChange={(e) => handleChange("goal", e.target.value)}
                  className={fieldClass}
                  required
                >
                  <option value="">Select your goal</option>
                  {GOAL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Training Experience" htmlFor="experience">
                <select
                  id="experience"
                  value={formData.experience ?? ""}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className={fieldClass}
                  required
                >
                  <option value="">Select your experience</option>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Training Days/Week" htmlFor="days">
                  <input
                    id="days"
                    type="number"
                    min="1"
                    max="7"
                    placeholder="How many days per week?"
                    value={formData.days_per_week ?? ""}
                    onChange={(e) =>
                      handleChange("days_per_week", e.target.value ? Number(e.target.value) : null)
                    }
                    className={fieldClass}
                    required
                  />
                </FormField>
                <FormField label="Workout Duration" htmlFor="duration">
                  <select
                    id="duration"
                    value={formData.session_duration ?? ""}
                    onChange={(e) => handleChange("session_duration", e.target.value)}
                    className={fieldClass}
                    required
                  >
                    <option value="">Select duration</option>
                    {DURATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Training Location" htmlFor="location">
                <select
                  id="location"
                  value={formData.location ?? ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={fieldClass}
                  required
                >
                  <option value="">Select location</option>
                  {LOCATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Available Equipment" htmlFor="equipment">
                <select
                  id="equipment"
                  value={formData.equipment ?? ""}
                  onChange={(e) => handleChange("equipment", e.target.value)}
                  className={fieldClass}
                  required
                >
                  <option value="">Select equipment</option>
                  {EQUIPMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="flex items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={deleting}
                  className={`text-xs ${deleting ? "cursor-not-allowed opacity-50" : "text-gray-400 transition-colors hover:text-[#ff6b6b]"}`}
                >
                  {deleting ? "Signing out..." : "Sign out"}
                </button>
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? "Saving Changes..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white placeholder-gray-600 transition-all focus:border-[#ccff00]/60 focus:outline-none focus:shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] disabled:opacity-50";

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-gray-400"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
