import type { BodySummary } from "@/types/junction";
import MetricCard, { MetricRow } from "./MetricCard";

interface BodyCardProps {
  data: BodySummary;
}

export default function BodyCard({ data }: BodyCardProps) {
  const weightUnit = data.weight_unit === "kg" ? "kg" : "lbs";

  return (
    <MetricCard
      title="Body Composition"
      icon="⚖️"
      provider={data.provider}
      date={data.date}
    >
      <MetricRow label="Weight" value={data.weight} unit={weightUnit} />
      <MetricRow label="BMI" value={data.bmi} />
      <MetricRow
        label="Body Fat"
        value={data.body_fat_percentage}
        unit="%"
      />
      <MetricRow label="Muscle Mass" value={data.muscle_mass} unit={weightUnit} />
      <MetricRow label="Bone Mass" value={data.bone_mass} unit={weightUnit} />
      <MetricRow label="Hydration" value={data.water_percentage} unit="%" />
      <MetricRow
        label="Basal Metabolic Rate"
        value={data.basal_metabolic_rate}
        unit="kcal"
      />
    </MetricCard>
  );
}
