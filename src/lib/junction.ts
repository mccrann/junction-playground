/**
 * Junction API client for server-side use.
 * The API key is never exposed to the browser—all calls go through Next.js API routes.
 * @see https://docs.junction.health
 */

import type {
  ActivitySummary,
  BodySummary,
  HeartRateSummary,
  Provider,
  SleepSummary,
} from "@/types/junction";

const JUNCTION_BASE_URL =
  process.env.JUNCTION_BASE_URL ?? "https://api.junction.health/v1";

const JUNCTION_API_KEY = process.env.JUNCTION_API_KEY ?? "";

/**
 * Build common request headers including the Junction API key.
 */
function buildHeaders(): HeadersInit {
  if (!JUNCTION_API_KEY) {
    throw new Error(
      "JUNCTION_API_KEY environment variable is not set. " +
        "Add it to .env.local before starting the dev server."
    );
  }
  return {
    "Content-Type": "application/json",
    "x-api-key": JUNCTION_API_KEY,
  };
}

/**
 * Generic JSON fetcher with error propagation.
 */
async function junctionFetch<T>(path: string): Promise<T> {
  const url = `${JUNCTION_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: buildHeaders(),
    // Revalidate at most every 60 s to avoid hammering the upstream API.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Junction API error ${res.status} ${res.statusText}: ${body}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

/**
 * Fetch available / connected wearable providers for the user.
 */
export async function fetchProviders(): Promise<Provider[]> {
  return junctionFetch<Provider[]>("/providers");
}

/**
 * Fetch the most recent body summary for a given user.
 * @param userId  Junction user identifier
 * @param date    ISO date string (YYYY-MM-DD).  Defaults to today.
 */
export async function fetchBodySummary(
  userId: string,
  date?: string
): Promise<BodySummary> {
  const params = new URLSearchParams({ user_id: userId });
  if (date) params.set("date", date);
  return junctionFetch<BodySummary>(`/data/body/summary?${params}`);
}

/**
 * Fetch heart-rate summary for a given user and date.
 */
export async function fetchHeartRate(
  userId: string,
  date?: string
): Promise<HeartRateSummary> {
  const params = new URLSearchParams({ user_id: userId });
  if (date) params.set("date", date);
  return junctionFetch<HeartRateSummary>(`/data/heart_rate?${params}`);
}

/**
 * Fetch sleep summary for a given user and date.
 */
export async function fetchSleep(
  userId: string,
  date?: string
): Promise<SleepSummary> {
  const params = new URLSearchParams({ user_id: userId });
  if (date) params.set("date", date);
  return junctionFetch<SleepSummary>(`/data/sleep?${params}`);
}

/**
 * Fetch activity (steps / calories) summary for a given user and date.
 */
export async function fetchActivity(
  userId: string,
  date?: string
): Promise<ActivitySummary> {
  const params = new URLSearchParams({ user_id: userId });
  if (date) params.set("date", date);
  return junctionFetch<ActivitySummary>(`/data/activity?${params}`);
}
