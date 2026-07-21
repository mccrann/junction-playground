"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type SleepChartReading = {
  date: string
  hours: number
}

type SleepChartProps = {
  data: SleepChartReading[]
}

export default function SleepChart({
  data,
}: SleepChartProps) {
  return (
    <section className="sleep-chart-panel">
      <div className="comparison-heading">
        <h2>Fitbit Watch Sleep Over Time</h2>
        <p>
          Total sleep reported by the watch each night.
        </p>
      </div>

      <div className="sleep-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#dce8eb"
            />

            <XAxis
              dataKey="date"
              tickFormatter={date =>
                new Date(`${date}T12:00:00`).toLocaleDateString(
                  "en-IE",
                  {
                    day: "numeric",
                    month: "short",
                  }
                )
              }
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, 12]}
              tickFormatter={hours => `${hours}h`}
              tick={{ fontSize: 12 }}
              width={40}
            />

            <Tooltip
              labelFormatter={date =>
                new Date(
                  `${date}T12:00:00`
                ).toLocaleDateString("en-IE", {
                  day: "numeric",
                  month: "long",
                })
              }
              formatter={value => [
                `${Number(value).toFixed(1)} hours`,
                "Total sleep",
              ]}
            />

            <Line
              type="monotone"
              dataKey="hours"
              stroke="#168aad"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#168aad",
                strokeWidth: 0,
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}