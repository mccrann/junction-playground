import type { HeartRateSummary } from "@/types/junction";
import MetricCard, { MetricRow } from "./MetricCard";

interface HeartRateCardProps {
  data: HeartRateSummary;
}

export default function HeartRateCard({ data }: HeartRateCardProps) {
  return (
    <MetricCard
      title="Heart Rate"
      icon="❤️"
      provider={data.provider}
      date={data.date}
    >
      <MetricRow
        label="Resting Heart Rate"
        value={data.resting_heart_rate}
        unit="bpm"
      />
      <MetricRow
        label="Average Heart Rate"
        value={data.average_heart_rate}
        unit="bpm"
      />
      <MetricRow
        label="Max Heart Rate"
        value={data.max_heart_rate}
        unit="bpm"
      />
      <MetricRow
        label="Min Heart Rate"
        value={data.min_heart_rate}
        unit="bpm"
      />
      <MetricRow
        label="Heart Rate Variability"
        value={data.heart_rate_variability}
        unit="ms"
      />
      {data.samples.length > 0 && (
        <p className="pt-1 text-xs text-gray-400">
          {data.samples.length} HR sample
          {data.samples.length !== 1 ? "s" : ""} recorded
        </p>
      )}
    </MetricCard>
  );
}
