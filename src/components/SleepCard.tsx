import type { SleepSummary } from "@/types/junction";
import MetricCard, { MetricRow } from "./MetricCard";

interface SleepCardProps {
  data: SleepSummary;
}

/** Converts seconds to a human-readable "Xh Ym" string. */
function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function SleepCard({ data }: SleepCardProps) {
  const stageMap: Record<string, string> = {
    awake: "Awake",
    light: "Light",
    deep: "Deep",
    rem: "REM",
    unknown: "Unknown",
  };

  return (
    <MetricCard
      title="Sleep"
      icon="🌙"
      provider={data.provider}
      date={data.date}
    >
      <MetricRow
        label="Total Sleep"
        value={formatDuration(data.total_sleep_duration_seconds)}
      />
      <MetricRow
        label="Sleep Efficiency"
        value={data.sleep_efficiency}
        unit="%"
      />
      <MetricRow label="Sleep Score" value={data.sleep_score} unit="/100" />
      <MetricRow
        label="Time to Fall Asleep"
        value={
          data.time_to_sleep_seconds != null
            ? formatDuration(data.time_to_sleep_seconds)
            : undefined
        }
      />
      <MetricRow label="Awakenings" value={data.awakenings} />

      {data.stages.length > 0 && (
        <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Sleep Stages
          </p>
          {data.stages.map((s) => (
            <MetricRow
              key={s.stage}
              label={stageMap[s.stage] ?? s.stage}
              value={formatDuration(s.duration_seconds)}
            />
          ))}
        </div>
      )}
    </MetricCard>
  );
}
