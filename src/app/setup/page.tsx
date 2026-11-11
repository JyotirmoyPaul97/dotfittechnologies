"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { isProfileComplete, upsertProfile, type ProfileFormData } from "@/lib/profiles";
import { AppHeader } from "@/components/layout/AppHeader";
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

export default function SetupPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, loading: authLoading, profileLoading, loadProfile } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRedirectedRef = useRef(false);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (hasRedirectedRef.current) return;
    if (authLoading || profileLoading) return;
    if (!user) {
      router.replace("/login");
      hasRedirectedRef.current = true;
      return;
    }
    if (isProfileComplete(profile) && pathname !== "/dashboard") {
      router.replace("/dashboard");
      hasRedirectedRef.current = true;
    }
  }, [user, profile, authLoading, profileLoading, pathname, router]);

  useEffect(() => {
    if (isLoadedRef.current || !user || !profile) return;
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
    isLoadedRef.current = true;
  }, [user, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericFields = ["days_per_week", "age", "height_cm", "weight_kg"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (formData.age === null || formData.age < 13 || formData.age > 120) {
      setError("Please enter a valid age between 13 and 120");
      return;
    }
    if (formData.days_per_week === null || formData.days_per_week < 1 || formData.days_per_week > 7) {
      setError("Please enter valid training days per week (1-7)");
      return;
    }

    setSubmitting(true);

    try {
      if (!user) {
        setError("Authentication session expired. Please log in again.");
        setSubmitting(false);
        return;
      }

      const saved = await upsertProfile(user.id, formData);
      if (!saved) {
        setError("Could not save your profile. Please try again.");
        setSubmitting(false);
        return;
      }

      await loadProfile();
      router.replace("/dashboard");
    } catch (err) {
      console.error("Profile save error:", err);
      setError("An unexpected error occurred while saving.");
      setSubmitting(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-500 border-t-transparent" />
          <p className="text-sm text-zinc-400">Loading setup...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b] text-white">
        <p className="text-gray-400">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-white">
      <AppHeader />
      <div className="flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <h1 className="mb-2 text-2xl font-bold">Complete Your Setup</h1>
          <p className="mb-6 text-sm text-zinc-400">
            Configure your personal profile preferences for IntFit.ai.
          </p>

          {error && (
            <div className="mb-6 rounded-xl border border-red-800 bg-red-950/50 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Full Name" htmlFor="name">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={inputClass}
                required
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Age" htmlFor="age">
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="13"
                  max="120"
                  value={formData.age ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Gender" htmlFor="gender">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Height (cm)" htmlFor="height_cm">
                <input
                  type="number"
                  id="height_cm"
                  name="height_cm"
                  min="100"
                  max="250"
                  value={formData.height_cm ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Weight (kg)" htmlFor="weight_kg">
                <input
                  type="number"
                  id="weight_kg"
                  name="weight_kg"
                  min="30"
                  max="300"
                  value={formData.weight_kg ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Primary Goal" htmlFor="goal">
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select your goal</option>
                  {GOAL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Experience Level" htmlFor="experience">
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select experience</option>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Training Days Per Week" htmlFor="days_per_week">
                <input
                  type="number"
                  id="days_per_week"
                  name="days_per_week"
                  min="1"
                  max="7"
                  value={formData.days_per_week ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Workout Duration" htmlFor="session_duration">
                <select
                  id="session_duration"
                  name="session_duration"
                  value={formData.session_duration ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select duration</option>
                  {DURATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Training Location" htmlFor="location">
                <select
                  id="location"
                  name="location"
                  value={formData.location ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select location</option>
                  {LOCATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Available Equipment" htmlFor="equipment">
                <select
                  id="equipment"
                  name="equipment"
                  value={formData.equipment ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select equipment</option>
                  {EQUIPMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-lime-500 py-4 font-semibold text-black transition duration-200 hover:bg-lime-400 disabled:opacity-50"
            >
              {submitting ? "Saving Profile..." : "Save & Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white focus:border-lime-500 focus:outline-none";

function Field({
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
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>
      {children}
    </div>
  );
}
