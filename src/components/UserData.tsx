import { JunctionClient, JunctionEnvironment } from "@junction-api/sdk";

export async function UserData() {
const userId = process.env.JUNCTION_DEFAULT_USER_ID || '5b572b1e-e813-440a-90ea-2be559afe847';
const client = new JunctionClient({ apiKey: process.env.JUNCTION_API_KEY, environment: JunctionEnvironment.SandboxEu
});

 

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

const dates = Array.from(
  new Set(mainSleepRecords.map(record => record.calendarDate))
).sort()





 return (
  <main>
    <h1>One Human, Four Devices</h1>

    <p>
      Four connected devices recorded the same person sleeping.
      Here is what each device reported.
    </p>

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
