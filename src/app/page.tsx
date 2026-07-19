import BodyCard from "@/components/BodyCard";
import HeartRateCard from "@/components/HeartRateCard";
import SleepCard from "@/components/SleepCard";
import ActivityCard from "@/components/ActivityCard";
import ProviderList from "@/components/ProviderList";
import {
  DEMO_ACTIVITY,
  DEMO_BODY,
  DEMO_HEART_RATE,
  DEMO_PROVIDERS,
  DEMO_SLEEP,
} from "@/lib/mockData";
import type {
  ActivitySummary,
  BodySummary,
  HeartRateSummary,
  Provider,
  SleepSummary,
} from "@/types/junction";

/**
 * Attempt to fetch live data from the Junction API via our proxy routes.
 * Falls back to mock data if the API key is not configured.
 */
async function fetchDashboardData(userId: string, date: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  async function safeFetch<T>(path: string): Promise<T | null> {
    try {
      const res = await fetch(
        `${base}/api/junction/${path}?user_id=${userId}&date=${date}`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) return null;
      return res.json() as Promise<T>;
    } catch {
      return null;
    }
  }

  const [body, heartRate, sleep, activity, providers] = await Promise.all([
    safeFetch<BodySummary>("body"),
    safeFetch<HeartRateSummary>("heartrate"),
    safeFetch<SleepSummary>("sleep"),
    safeFetch<ActivitySummary>("activity"),
    safeFetch<Provider[]>("providers"),
  ]);

  return { body, heartRate, sleep, activity, providers };
}

export default async function HomePage() {
  const isDemoMode = !process.env.JUNCTION_API_KEY;
  const userId = process.env.JUNCTION_DEFAULT_USER_ID ?? "demo-user";
  const today = new Date().toISOString().split("T")[0];

  const live = isDemoMode
    ? null
    : await fetchDashboardData(userId, today);

  const body = live?.body ?? DEMO_BODY;
  const heartRate = live?.heartRate ?? DEMO_HEART_RATE;
  const sleep = live?.sleep ?? DEMO_SLEEP;
  const activity = live?.activity ?? DEMO_ACTIVITY;
  const providers = live?.providers ?? DEMO_PROVIDERS;

  return (
    <div className="space-y-8">
      {isDemoMode && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Demo mode</strong> — No{" "}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            JUNCTION_API_KEY
          </code>{" "}
          detected. Showing mock wearable data. Add your key to{" "}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            .env.local
          </code>{" "}
          to load real data.
        </div>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Connected Providers
        </h2>
        <ProviderList providers={providers} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Today&apos;s Health Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <BodyCard data={body} />
          <HeartRateCard data={heartRate} />
          <SleepCard data={sleep} />
          <ActivityCard data={activity} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          API Routes
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm text-gray-600">
            The following Next.js API routes proxy requests to the Junction API,
            keeping your API key server-side:
          </p>
          <ul className="space-y-1 font-mono text-xs text-gray-700">
            {[
              ["GET", "/api/junction/providers", "List connected providers"],
              ["GET", "/api/junction/body?user_id=…", "Body composition summary"],
              ["GET", "/api/junction/heartrate?user_id=…", "Heart rate summary"],
              ["GET", "/api/junction/sleep?user_id=…", "Sleep summary"],
              ["GET", "/api/junction/activity?user_id=…", "Activity / steps summary"],
            ].map(([method, route, desc]) => (
              <li key={route} className="flex flex-wrap items-baseline gap-2">
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-700">
                  {method}
                </span>
                <span className="text-gray-900">{route}</span>
                <span className="text-gray-400">— {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
