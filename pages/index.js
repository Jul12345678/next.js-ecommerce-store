import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import vercelLogo from '../public/vercel.svg';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <h1>Home page</h1>
      <p>Home page content</p>

      <div>Example 1 Pic with img tag (BAD)</div>
      <img src="/vercel.svg" alt="Vercel" />

      <div>Example 2.0 Pic with img component (GOOD)</div>
      <Image src="/vercel.svg" alt="Vercel" width="283" height="64" />

      <div>Example 2.1 Pic with img component(GOOD)</div>
      <Image src={vercelLogo} alt="Vercel" />
    </Layout>
  );
}
