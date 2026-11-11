export const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export const GOAL_OPTIONS = [
  { value: "hypertrophy", label: "Muscle Building (Hypertrophy)" },
  { value: "strength", label: "Strength Training" },
  { value: "fat_loss", label: "Fat Loss & Toning" },
  { value: "endurance", label: "Endurance & Fitness" },
  { value: "general_fitness", label: "General Fitness" },
] as const;

export const EXPERIENCE_OPTIONS = [
  { value: "beginner", label: "Beginner (< 6 months)" },
  { value: "intermediate", label: "Intermediate (6 months – 2 years)" },
  { value: "advanced", label: "Advanced (2+ years)" },
] as const;

export const DURATION_OPTIONS = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
  { value: "120", label: "120 minutes" },
] as const;

export const LOCATION_OPTIONS = [
  { value: "gym", label: "Gym" },
  { value: "home", label: "Home" },
  { value: "outdoor", label: "Outdoor / Park" },
  { value: "mixed", label: "Mixed" },
] as const;

export const EQUIPMENT_OPTIONS = [
  { value: "full_gym", label: "Full Gym Access" },
  { value: "basic_weights", label: "Basic Weights (dumbbells, bench)" },
  { value: "bodyweight_only", label: "Bodyweight Only" },
  { value: "resistance_bands", label: "Resistance Bands" },
  { value: "cardio_equipment", label: "Cardio Equipment" },
  { value: "limited", label: "Limited / Other" },
] as const;
