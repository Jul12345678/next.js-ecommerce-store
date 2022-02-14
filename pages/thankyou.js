import Head from 'next/head';
import Layout from '../components/Layout';

export default function Thankyou() {
  return (
    <Layout>
      <Head>
        <title>Thank You!</title>
      </Head>
      <div>
        <h1>Thank you for your order!</h1>
      </div>
    </Layout>
  );
}
