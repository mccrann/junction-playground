import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header >
          <h1 >
            Junction Playground
          </h1>
          <p>This demo is making use of generated data for a fictional person. The data comes direct from the Junction sandbox demo devices Oura ring, Fitbit (watch and app) and Apple Health.</p>
          <p>
            The table compares each source&apos;s main sleep record for the
            day, revealing how differently they interpret the same
            night&apos;s sleep.
          </p>
          <p>This is only sample data and is not indicitive of an actual real difference beteen devices. It is only based off of the sample data received from Junction Sandbox.
          </p>
        </header>
        <main>{children}</main>
        <footer>
          Powered by the{" "}
          <a
            href="https://junction.health"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noreferrer"
          >
            Junction API
          </a>
          Built by{" "} 
           <a
            href="https://karenmccrann.xyz"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noreferrer"
          >
            Karen McCrann
          </a>
        </footer>
      </body>
    </html>
  );
}
