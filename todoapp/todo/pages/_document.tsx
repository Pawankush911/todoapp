import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="menifest" href='/menifest.json'/>
      <link rel='apple-touch-icon' href='/icon.png'></link>
      <meta name="Theme-color" content="#fff"/>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
