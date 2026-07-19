import type { Provider } from "@/types/junction";

interface ProviderListProps {
  providers: Provider[];
}

const statusColors: Record<Provider["status"], string> = {
  connected: "bg-green-100 text-green-700",
  disconnected: "bg-gray-100 text-gray-500",
  error: "bg-red-100 text-red-600",
};

export default function ProviderList({ providers }: ProviderListProps) {
  if (providers.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">No providers connected.</p>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white shadow-sm">
      {providers.map((p) => (
        <li key={p.id} className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              width={28}
              height={28}
              className="rounded"
            />
            <span className="font-medium text-gray-800">{p.name}</span>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[p.status]}`}
          >
            {p.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
