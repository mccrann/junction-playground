import type { ActivitySummary } from "@/types/junction";
import MetricCard, { MetricRow } from "./MetricCard";

interface ActivityCardProps {
  data: ActivitySummary;
}

export default function ActivityCard({ data }: ActivityCardProps) {
  const distanceKm =
    data.distance_meters != null
      ? (data.distance_meters / 1000).toFixed(2)
      : undefined;

  return (
    <MetricCard
      title="Activity"
      icon="🏃"
      provider={data.provider}
      date={data.date}
    >
      <MetricRow label="Steps" value={data.steps} />
      <MetricRow label="Distance" value={distanceKm} unit="km" />
      <MetricRow
        label="Active Calories"
        value={data.active_calories}
        unit="kcal"
      />
      <MetricRow
        label="Total Calories"
        value={data.total_calories}
        unit="kcal"
      />
      <MetricRow
        label="Active Minutes"
        value={data.active_minutes}
        unit="min"
      />
      <MetricRow label="Floors Climbed" value={data.floors_climbed} />
      <MetricRow
        label="Average Pace"
        value={data.average_pace_minutes_per_km}
        unit="min/km"
      />
    </MetricCard>
  );
}
