import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>IdentitySync Global | Enterprise Identity & Directory Automation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=400;500;600;700;800&family=JetBrains+Mono:wght=400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <style global jsx>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #ffffff;
          color: #0f172a;
          overflow-x: hidden;
        }
        *, *:before, *:after {
          box-sizing: border-box;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
