import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Checkout() {
  return (
    <Layout>
      <Head>
        <title>Checkout</title>
      </Head>
      <div>
        <h1>Checkout</h1>
        <p>Customer information</p>
      </div>

      <div>
        <label>
          First Name:
          <input required type="fname" />
        </label>
        <label>
          Last Name:
          <input required type="lname" />
        </label>

        <label>
          Email Address:
          <input type="email" required />
        </label>
        <br />
        <br />
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
        <br />
        <br />
        <label>
          Expiration Date:
          <input required />
        </label>
        <label>
          CVV Code:
          <input required />
        </label>
        <br />
        <br />
        <Link href="/thankyou">
          <a>
            <button>Confirm</button>
          </a>
        </Link>
      </div>
    </Layout>
  );
}
