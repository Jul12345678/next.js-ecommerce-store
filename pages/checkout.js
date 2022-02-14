import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Checkout() {
  return (
    <Layout>
      <Head>
        <div>
          <h1>Checkout</h1>
          <p>Customer information</p>
        </div>
        <section>
          <div>
            <label>
              First Name:
              <input required />
            </label>
            <label>
              Last Name:
              <input required />
            </label>
            <label>
              Email Address:
              <input required />
            </label>
            <label>
              Delivery Address:
              <input required />
            </label>
            <label>
              City:
              <input required />
            </label>
            <label>
              Country:
              <input required />
            </label>
            <label>
              Postal Code:
              <input required />
            </label>
            <p>Method of payment</p>
            <label>
              Card Type:
              <input required />
            </label>
            <label>
              Card Number:
              <input required />
            </label>
            <label>
              Expiration Date:
              <input required />
            </label>
            <label>
              CVV Code:
              <input required />
            </label>
            <Link href="Thankyoupage">
              <a>
                <button>Confirm</button>
              </a>
            </Link>
          </div>
        </section>
      </Head>
    </Layout>
  );
}
