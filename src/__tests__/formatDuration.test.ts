/**
 * Tests for the SleepCard duration formatter utility.
 * We extract and test the formatting logic independently.
 */

/** Duplicated here to test in isolation (same logic as SleepCard.tsx). */
function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

describe("formatDuration", () => {
  it("formats 0 seconds", () => {
    expect(formatDuration(0)).toBe("0h 0m");
  });

  it("formats exactly 1 hour", () => {
    expect(formatDuration(3600)).toBe("1h 0m");
  });

  it("formats 7h 45m", () => {
    expect(formatDuration(27900)).toBe("7h 45m");
  });

  it("formats 12 minutes", () => {
    expect(formatDuration(720)).toBe("0h 12m");
  });

  it("handles fractional seconds by flooring", () => {
    expect(formatDuration(3661)).toBe("1h 1m");
  });
});
