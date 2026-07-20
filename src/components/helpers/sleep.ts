

// const demoData = await client.user.getConnectedProviders({ userId: userId });
// const data = await client.user.refresh({ userId: userId });

// const results = demoData.providers.map(
//   provider => provider.resourceAvailability
// )
// console.log('results', results)


// console.log('data', data)


// const sleepdata = await client.sleep.get({
//     userId: userId,
//     startDate: "2026-07-01",
//     endDate: "2026-07-20",
// });
// console.log ('sleepdata', sleepdata)

// const profiledata = await client.profile.get({ userId: userId });
// console.log('profiledata', profiledata)

// Link User to Demo Provider
   // readonly AppleHealthKit: "apple_health_kit";
    // readonly Fitbit: "fitbit";
    // readonly FreestyleLibre: "freestyle_libre";
    // readonly Oura: "oura";
// const data = await client.user.get({ userId: userId });
// console.log(data, 'data')

//  const provider =  await client.link.connectDemoProvider({
//     userId: userId,
//     provider: 'oura'
// });
// console.log('apple', apple)
  
// console.table(
//   sleepdata.sleep
//     .filter(record => record.source.provider === "fitbit")
//     .map(record => ({
//       id: record.id,
//       date: record.calendarDate,
//       total: record.total,
//       bedtime: record.bedtimeStart,
//     }))
// )


const comparisons = Object.entries(sleepByDate).map(
  ([date, records]) => ({
    date,
    devices: records.map(record => ({
      provider: record.source.provider,
      totalSleep: secondsToHours(record.total),
      deepSleep: secondsToHours(record.deep),
      lightSleep: secondsToHours(record.light),
      remSleep: secondsToHours(record.rem),
      awake: secondsToHours(record.awake),
      efficiency: record.efficiency,
      averageHeartRate: record.hrAverage,
      lowestHeartRate: record.hrLowest,
      hrv: record.averageHrv,
      readiness: record.recoveryReadinessScore,
    })),
  })
)

const getRange = (values: number[]) => {
  const lowest = Math.min(...values)
  const highest = Math.max(...values)

  return {
    lowest,
    highest,
    difference: highest - lowest,
  }
}
const dailyDisagreement = Object.entries(sleepByDate).map(
  ([date, records]) => ({
    date,

    totalSleep: getRange(
      records.map(record => record.total)
    ),

    deepSleep: getRange(
      records.map(record => record.deep)
    ),
  })
)


const sleepByProvider = mainSleepRecords.reduce<
  Record<string, SleepRecord[]>
>((providers, record) => {
  const provider = record.source.provider

  if (!providers[provider]) {
    providers[provider] = []
  }

  providers[provider].push(record)

  return providers
}, {})



const sleepByDate = mainSleepRecords.reduce<
  Record<string, SleepRecord[]>
>((days, record) => {
  const date = record.calendarDate

  if (!days[date]) {
    days[date] = []
  }

  days[date].push(record)

  return days
}, {})






const secondsToHours = (seconds: number) =>
  Math.round((seconds / 3600) * 10) / 10

const sleepBySource = mainSleepRecords.reduce<
  Record<string, SleepRecord[]>
>((sources, record) => {
  const sourceName = `${record.source.provider}-${record.source.type}`

  if (!sources[sourceName]) {
    sources[sourceName] = []
  }

  sources[sourceName].push(record)

  return sources
}, {})
