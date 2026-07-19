/**
 * Mock data used when JUNCTION_API_KEY is not set.
 * Demonstrates the full UI without requiring a real API key.
 */

import type {
  ActivitySummary,
  BodySummary,
  HeartRateSummary,
  Provider,
  SleepSummary,
} from "@/types/junction";

export const DEMO_PROVIDERS: Provider[] = [
  {
    id: "oura",
    name: "Oura Ring",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Oura_Ring_logo.svg/240px-Oura_Ring_logo.svg.png",
    status: "connected",
    connected_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "fitbit",
    name: "Fitbit",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Fitbit_logo.svg/240px-Fitbit_logo.svg.png",
    status: "connected",
    connected_at: "2024-02-01T08:30:00Z",
  },
  {
    id: "garmin",
    name: "Garmin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Garmin_logo.svg/240px-Garmin_logo.svg.png",
    status: "disconnected",
    connected_at: null,
  },
];

const TODAY = new Date().toISOString().split("T")[0];

export const DEMO_BODY: BodySummary = {
  date: TODAY,
  user_id: "demo-user",
  provider: "oura",
  weight: 72.4,
  weight_unit: "kg",
  bmi: 22.8,
  body_fat_percentage: 18.5,
  muscle_mass: 55.3,
  bone_mass: 3.2,
  water_percentage: 60.1,
  basal_metabolic_rate: 1720,
};

export const DEMO_HEART_RATE: HeartRateSummary = {
  date: TODAY,
  user_id: "demo-user",
  provider: "oura",
  resting_heart_rate: 58,
  average_heart_rate: 72,
  max_heart_rate: 145,
  min_heart_rate: 52,
  heart_rate_variability: 62,
  samples: Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${TODAY}T${String(i).padStart(2, "0")}:00:00Z`,
    bpm: 55 + Math.round(Math.sin(i / 3) * 15 + Math.random() * 10),
    source: "wrist" as const,
  })),
};

export const DEMO_SLEEP: SleepSummary = {
  date: TODAY,
  user_id: "demo-user",
  provider: "oura",
  sleep_start: `${TODAY}T22:45:00Z`,
  sleep_end: `${TODAY}T06:30:00Z`,
  total_sleep_duration_seconds: 27900, // 7h 45m
  sleep_efficiency: 88,
  sleep_score: 82,
  time_to_sleep_seconds: 720, // 12m
  awakenings: 3,
  stages: [
    { stage: "awake", duration_seconds: 1800 },
    { stage: "light", duration_seconds: 10800 },
    { stage: "deep", duration_seconds: 5400 },
    { stage: "rem", duration_seconds: 9900 },
  ],
};

export const DEMO_ACTIVITY: ActivitySummary = {
  date: TODAY,
  user_id: "demo-user",
  provider: "fitbit",
  steps: 9842,
  distance_meters: 7650,
  active_calories: 412,
  total_calories: 2134,
  active_minutes: 52,
  floors_climbed: 14,
  average_pace_minutes_per_km: 6.1,
};
