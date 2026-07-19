/**
 * TypeScript types for the Junction API
 * Junction normalizes wearable health data from 300+ providers into a common schema.
 * @see https://docs.junction.health
 */

// ─── Common ───────────────────────────────────────────────────────────────────

export interface JunctionApiError {
  error: string;
  message: string;
  status: number;
}

export interface JunctionPaginatedResponse<T> {
  data: T[];
  next_cursor: string | null;
  has_more: boolean;
}

// ─── Providers ────────────────────────────────────────────────────────────────

export type ProviderStatus = "connected" | "disconnected" | "error";

export interface Provider {
  id: string;
  name: string;
  logo: string;
  status: ProviderStatus;
  connected_at: string | null;
}

// ─── Body Summary ─────────────────────────────────────────────────────────────

export interface BodySummary {
  date: string;
  user_id: string;
  provider: string;
  weight?: number | null;
  weight_unit: "kg" | "lbs";
  bmi?: number | null;
  body_fat_percentage?: number | null;
  muscle_mass?: number | null;
  bone_mass?: number | null;
  water_percentage?: number | null;
  basal_metabolic_rate?: number | null;
}

// ─── Heart Rate ───────────────────────────────────────────────────────────────

export interface HeartRateSample {
  timestamp: string;
  bpm: number;
  source: "wrist" | "chest" | "finger" | "unknown";
}

export interface HeartRateSummary {
  date: string;
  user_id: string;
  provider: string;
  resting_heart_rate?: number | null;
  average_heart_rate?: number | null;
  max_heart_rate?: number | null;
  min_heart_rate?: number | null;
  heart_rate_variability?: number | null;
  samples: HeartRateSample[];
}

// ─── Sleep ────────────────────────────────────────────────────────────────────

export type SleepStage =
  | "awake"
  | "light"
  | "deep"
  | "rem"
  | "unknown";

export interface SleepStageDuration {
  stage: SleepStage;
  duration_seconds: number;
}

export interface SleepSummary {
  date: string;
  user_id: string;
  provider: string;
  sleep_start: string;
  sleep_end: string;
  total_sleep_duration_seconds: number;
  sleep_efficiency?: number | null;
  sleep_score?: number | null;
  time_to_sleep_seconds?: number | null;
  awakenings?: number | null;
  stages: SleepStageDuration[];
}

// ─── Activity / Steps ─────────────────────────────────────────────────────────

export interface ActivitySummary {
  date: string;
  user_id: string;
  provider: string;
  steps?: number | null;
  distance_meters?: number | null;
  active_calories?: number | null;
  total_calories?: number | null;
  active_minutes?: number | null;
  floors_climbed?: number | null;
  average_pace_minutes_per_km?: number | null;
}

// ─── Aggregated / Display ─────────────────────────────────────────────────────

export interface WearableDashboardData {
  body: BodySummary | null;
  heartRate: HeartRateSummary | null;
  sleep: SleepSummary | null;
  activity: ActivitySummary | null;
  providers: Provider[];
  fetchedAt: string;
}
