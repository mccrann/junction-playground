import { JunctionClient, JunctionEnvironment } from "@junction-api/sdk";
import {UserData} from '../components/UserData'

export default async function HomePage() {
    console.log('hi')

return <UserData />


}

//   const isDemoMode = process.env.JUNCTION_API_KEY;
//   const userId = process.env.JUNCTION_DEFAULT_USER_ID || '5b572b1e-e813-440a-90ea-2be559afe847';
//   const today = new Date().toISOString().split("T")[0];
// const client = new JunctionClient({ apiKey: process.env.JUNCTION_API_KEY, environment: JunctionEnvironment.SandboxEu
// });

// const update  = await client.user.patch({
//     userId: userId,
//     fallbackTimeZone: "Europe/London",
//     fallbackBirthDate: "1980-03-13",
// });




// const data = await client.user.get({ userId: userId });
// const birthday = data.fallbackBirthDate?.value
// const timezone = data.fallbackTimeZone?.id;
// let markup = 'Birthday is ';
// markup += birthday;
// markup += '.';
// markup += 'Timezone is ';
// markup += timezone;
// markup += '.';



// const demoData = await client.link.connectDemoProvider({
//     userId: userId,
//     provider: "fitbit",
// });

// console.log(demoData, 'demoData')

