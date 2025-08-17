import Head from 'next/head'
import '../app/globals.css'

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Awesome Simulations</title>
    </Head>
    <Component {...pageProps} />
  </>
}