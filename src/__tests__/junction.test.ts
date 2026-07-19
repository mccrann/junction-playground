/**
 * Unit tests for Junction API TypeScript types and mock data.
 */

import type {
  ActivitySummary,
  BodySummary,
  HeartRateSummary,
  Provider,
  SleepStageDuration,
} from "@/types/junction";
import {
  DEMO_ACTIVITY,
  DEMO_BODY,
  DEMO_HEART_RATE,
  DEMO_PROVIDERS,
  DEMO_SLEEP,
} from "@/lib/mockData";

describe("Junction types – BodySummary", () => {
  it("demo body data conforms to BodySummary type", () => {
    const body: BodySummary = DEMO_BODY;
    expect(body.user_id).toBe("demo-user");
    expect(body.weight_unit).toMatch(/^(kg|lbs)$/);
    expect(typeof body.weight).toBe("number");
    expect(typeof body.bmi).toBe("number");
    expect(typeof body.body_fat_percentage).toBe("number");
  });

  it("accepts null optional fields", () => {
    const minimal: BodySummary = {
      date: "2024-06-01",
      user_id: "u1",
      provider: "oura",
      weight_unit: "kg",
    };
    expect(minimal.weight).toBeUndefined();
    expect(minimal.bmi).toBeUndefined();
  });
});

describe("Junction types – HeartRateSummary", () => {
  it("demo heart rate data has valid samples", () => {
    const hr: HeartRateSummary = DEMO_HEART_RATE;
    expect(hr.samples.length).toBeGreaterThan(0);
    hr.samples.forEach((s) => {
      expect(s.bpm).toBeGreaterThan(0);
      expect(["wrist", "chest", "finger", "unknown"]).toContain(s.source);
    });
  });

  it("resting heart rate is reasonable", () => {
    expect(DEMO_HEART_RATE.resting_heart_rate).toBeGreaterThan(40);
    expect(DEMO_HEART_RATE.resting_heart_rate).toBeLessThan(120);
  });
});

describe("Junction types – SleepSummary", () => {
  it("demo sleep stages cover all valid values", () => {
    const validStages = new Set(["awake", "light", "deep", "rem", "unknown"]);
    const stages: SleepStageDuration[] = DEMO_SLEEP.stages;
    stages.forEach((s) => expect(validStages).toContain(s.stage));
  });

  it("total sleep duration is positive", () => {
    expect(DEMO_SLEEP.total_sleep_duration_seconds).toBeGreaterThan(0);
  });

  it("sleep efficiency is between 0 and 100", () => {
    const eff = DEMO_SLEEP.sleep_efficiency;
    if (eff != null) {
      expect(eff).toBeGreaterThanOrEqual(0);
      expect(eff).toBeLessThanOrEqual(100);
    }
  });
});

describe("Junction types – ActivitySummary", () => {
  it("demo activity data has positive steps", () => {
    const activity: ActivitySummary = DEMO_ACTIVITY;
    expect(activity.steps).toBeGreaterThan(0);
  });

  it("active calories are less than total calories", () => {
    const { active_calories, total_calories } = DEMO_ACTIVITY;
    if (active_calories != null && total_calories != null) {
      expect(active_calories).toBeLessThanOrEqual(total_calories);
    }
  });
});

describe("Junction types – Provider", () => {
  it("demo providers include at least one connected provider", () => {
    const providers: Provider[] = DEMO_PROVIDERS;
    const connected = providers.filter((p) => p.status === "connected");
    expect(connected.length).toBeGreaterThan(0);
  });

  it("all providers have required fields", () => {
    DEMO_PROVIDERS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(["connected", "disconnected", "error"]).toContain(p.status);
    });
  });

  it("disconnected providers have null connected_at", () => {
    const disconnected = DEMO_PROVIDERS.filter(
      (p) => p.status === "disconnected"
    );
    disconnected.forEach((p) => expect(p.connected_at).toBeNull());
  });
});
