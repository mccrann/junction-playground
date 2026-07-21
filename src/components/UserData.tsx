import { JunctionClient, JunctionEnvironment } from "@junction-api/sdk";
import SleepChat from "./sleep-chat"
import SleepChart from "./sleep-chart"

export async function UserData() {
const userId  = process.env.JUNCTION_DEFAULT_USER_ID;
const client = new JunctionClient({ apiKey: process.env.JUNCTION_API_KEY, environment: JunctionEnvironment.SandboxEu
});

if (!userId || !process.env.JUNCTION_API_KEY) {
    throw new Error(
      "Missing required env vars: JUNCTION_DEFAULT_USER_ID and/or JUNCTION_API_KEY"
    );
  }

const sleepdata = await client.sleep.get({
    userId: userId,
    startDate: "2026-07-01",
    endDate: "2026-07-20",
});

type SleepRecord = (typeof sleepdata.sleep)[number]

const mainSleepRecords = sleepdata.sleep.filter(
  record => record.type === "long_sleep"
)

const formatDuration = (
  seconds: number | null | undefined
) => {
  if (seconds == null) return "—"

  const totalMinutes = Math.round(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h ${minutes}m`
}

const formatProviderName = (provider: string) =>
  provider
    .replaceAll("_", " ")
    .replace(/\b\w/g, letter => letter.toUpperCase())

const getSourceKey = (record: SleepRecord) =>
  [
    record.source.provider,
    record.source.type,
    record.source.deviceId,
  ].join("-")


const getDeviceIcon = (record: SleepRecord) =>
  <>
  <img src = {record.source.logo} alt = {record.source.name} title= {record.source.provider} className="device-icon"/>
  <h3>{record.source.name} <span>{record.source.type}</span></h3>

</>

const deviceSources = Array.from(
  new Map(
    mainSleepRecords.map(record => {
      const key = getSourceKey(record)
      const icon = getDeviceIcon(record)
      return [
        key,
        {
          key,
          icon,
          label: `${formatProviderName(record.source.provider)} ${formatProviderName(record.source.type ?? "")}`,
        },
      ]
    })
  ).values()
)

const deviceAverages = deviceSources.map(device => {
  const totals = mainSleepRecords
    .filter(record => getSourceKey(record) === device.key)
    .map(record => record.total)
    .filter(
      (total): total is number =>
        typeof total === "number"
    )

  const average =
    totals.reduce((sum, total) => sum + total, 0) /
    totals.length

  return {
    ...device,
    average,
  }
})

const validSleepRecords = mainSleepRecords.filter(
  (
    record
  ): record is SleepRecord & { total: number } =>
    typeof record.total === "number"
)

const sleepByDuration = [...validSleepRecords].sort(
  (a, b) => b.total - a.total
)

const longestSleep = sleepByDuration[0]
const shortestSleep =
  sleepByDuration[sleepByDuration.length - 1]

const deviceReadingCounts = deviceSources.map(device => ({
  ...device,

  readingCount: validSleepRecords.filter(
    record => getSourceKey(record) === device.key
  ).length,
}))

const mostConsistentDevice =
  deviceReadingCounts.length > 0
    ? deviceReadingCounts.reduce((mostConsistent, device) =>
        device.readingCount >
        mostConsistent.readingCount
          ? device
          : mostConsistent
      )
    : null

const dates = Array.from(
  new Set(mainSleepRecords.map(record => record.calendarDate))
).sort()


const agentSleepData = mostConsistentDevice
  ? validSleepRecords
      .filter(
        record =>
          getSourceKey(record) ===
          mostConsistentDevice.key
      )
      .map(record => ({
        calendarDate: record.calendarDate,
        total: record.total,
        bedtimeStart:
          record.bedtimeStart?.toISOString() ?? null,
        bedtimeStop:
          record.bedtimeStop?.toISOString() ?? null,
      }))
  : []

const fitbitWatchChartData = mainSleepRecords
  .filter(
    record =>
      record.source.provider.toLowerCase() === "fitbit" &&
      record.source.type?.toLowerCase() === "watch" &&
      typeof record.total === "number"
  )
  .map(record => ({
    date: record.calendarDate,
    hours: Number((record.total / 3600).toFixed(2)),
  }))
  .sort((a, b) => a.date.localeCompare(b.date))

 return (
  <main>
    <section className = "grid grid2">
      <div className= "panel">
        <h2>One Human, Four Devices</h2>
        <p>
          I timeboxed a project with the Junction API and, in just over a day, built a playful way to explore how four connected health sources interpret the same person’s sleep. The dashboard compares their readings, visualises Fitbit sleep over time, and uses an AI agent to answer questions about the most complete dataset.
        </p>
        <p>
          This demo uses Junction’s sandbox data, but the same idea could help real users bring fragmented health data together, spot patterns and discrepancies, and add everyday context that wearable devices cannot see.
        </p>

        <div className="device-averages">
          {deviceAverages.map(device => (
            <div className="device-average" key={device.key}>
              {device.icon}

              <p>
                <strong>{formatDuration(device.average)}</strong>
                <span> average per night</span>
              </p>
            </div>
          ))}
        </div>
      </div>
<div className="panel">
  <h2>Your Sleep Stats</h2>

  {longestSleep && (
    <p>
      <strong>Longest sleep:</strong>{" "}
      {formatDuration(longestSleep.total)} on{" "}
      {longestSleep.calendarDate}, recorded by{" "}
      {longestSleep.source.name}.
    </p>
  )}

  {shortestSleep && (
    <p>
      <strong>Shortest sleep:</strong>{" "}
      {formatDuration(shortestSleep.total)} on{" "}
      {shortestSleep.calendarDate}, recorded by{" "}
      {shortestSleep.source.name}.
    </p>
  )}

  {mostConsistentDevice && (
  <SleepChat
    deviceName={mostConsistentDevice.label}
    sleepData={agentSleepData}
  />
)}
</div>
</section>
<section><SleepChart data={fitbitWatchChartData} /></section>
<section className="sleep-comparison-panel">
  <div className="comparison-heading">
    <h2>Total Sleep by Device</h2>
    <p>
      The same night, according to each connected source.
    </p>
  </div>

  <div className="comparison-table">
    <table>
      <thead>
        <tr>
          <th>Date</th>

          {deviceSources.map(device => (
            <th key={device.key}>
              <span
                className="device-icon"
                title={device.label}
                aria-label={device.label}
              >
                {device.icon}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dates.map(date => {
          const recordsForDate = mainSleepRecords.filter(
            record => record.calendarDate === date
          )

          return (
            <tr key={date}>
              <td>{date}</td>

              {deviceSources.map(device => {
                const record = recordsForDate.find(
                  record =>
                    getSourceKey(record) === device.key
                )

                return (
                  <td key={device.key}>
                    {record
                      ? formatDuration(record.total)
                      : "—"}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</section>


{/* <section className="disagreement-panel">
  <div className="disagreement-heading">
    <div>
      <h2>Where the Devices Disagree</h2>
      <p>
        You slept. Beyond that, opinions differ.
      </p>
    </div>
  </div>

  <div className="disagreement-table">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Total sleep range</th>
          <th>Total disagreement</th>
          <th>Deep sleep range</th>
          <th>Deep disagreement</th>
        </tr>
      </thead>

      <tbody>
        {dailyDisagreement.map(day => (
          <tr key={day.date}>
            <td>{day.date}</td>

            <td>
              {formatDuration(day.totalSleep.lowest)}
              {" – "}
              {formatDuration(day.totalSleep.highest)}
            </td>

            <td className="difference">
              {formatDuration(day.totalSleep.difference)}
            </td>

            <td>
              {formatDuration(day.deepSleep.lowest)}
              {" – "}
              {formatDuration(day.deepSleep.highest)}
            </td>

            <td className="difference">
              {formatDuration(day.deepSleep.difference)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

    <section className="device-grid">
      {Object.entries(sleepBySource).map(
        ([sourceName, records]) => (
              <article className="device-panel" key={sourceName}>
      <h2>{formatProviderName(sourceName)}</h2>


            <div className="device-records">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total sleep</th>
                    <th>Deep sleep</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map(record => (
                    <tr
                      key={`${sourceName}-${record.calendarDate}`}
                    >
                      <td>{record.calendarDate}</td>
                      <td>{formatDuration(record.total)}</td>
                      <td>{formatDuration(record.deep)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        )
      )}
    </section> */}
  </main>
)
}
