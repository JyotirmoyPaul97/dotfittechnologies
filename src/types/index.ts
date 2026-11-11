export interface ExerciseItem {
  id: string;
  name: string;
  category: string;
  weight: number;
  unit: string;
  sets: number;
  reps: number;
  completedSets: number[];
  restTimerSeconds: number;
  targetRpe: number;
  aiNote?: string;
}

export interface ProgressionDataPoint {
  week: string;
  weight: number;
  reps: number;
  volume: number;
  isCurrent?: boolean;
}

export interface AdaptationScenario {
  id: "exceeded" | "stable" | "fatigued";
  label: string;
  icon: string;
  statusText: string;
  performanceDelta: string;
  userLog: string;
  aiDiagnosis: string;
  aiAction: string;
  adjustmentLoad: string;
  adjustmentVolume: string;
  nextSessionFocus: string;
  accentColor: string;
}

export interface MacroTarget {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  percentage: number;
}
