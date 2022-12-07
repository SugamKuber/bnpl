import '../styles/globals.css'
import Layout from '../components/layout'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <Layout className="back">
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  )
}

export default MyApp;

