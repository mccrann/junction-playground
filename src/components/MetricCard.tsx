import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  icon: string;
  children: ReactNode;
  provider?: string;
  date?: string;
}

/**
 * A simple card that wraps a single health metric.
 */
export default function MetricCard({
  title,
  icon,
  children,
  provider,
  date,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {provider && (
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 capitalize">
            {provider}
          </span>
        )}
      </div>

      <div className="space-y-2">{children}</div>

      {date && (
        <p className="mt-4 text-xs text-gray-400">
          Data for{" "}
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}

/**
 * A single metric row: label + value.
 */
export function MetricRow({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | string | null | undefined;
  unit?: string;
}) {
  if (value == null) return null;
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">
        {typeof value === "number" ? value.toLocaleString() : value}
        {unit && <span className="ml-1 text-gray-400">{unit}</span>}
      </span>
    </div>
  );
}
