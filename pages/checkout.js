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
        <label data-test-id="checkout-first-name">
          First Name:
          <input required type="fname" />
        </label>
        <label data-test-id="checkout-last-name">
          Last Name:
          <input required type="lname" />
        </label>

        <label data-test-id="checkout-email">
          Email Address:
          <input type="email" required />
        </label>
        <br />
        <br />
        <label data-test-id="checkout-address">
          Delivery Address:
          <input required />
        </label>
        <label data-test-id="checkout-city">
          City:
          <input required />
        </label>
        <label data-test-id="checkout-country">
          Country:
          <input required />
        </label>
        <label data-test-id="checkout-postal-code">
          Postal Code:
          <input required />
        </label>
        <p>Method of payment</p>
        <label data-test-id="checkout-credit-card-type">
          Card Type:
          <input required />
        </label>
        <label data-test-id="checkout-credit-card">
          Card Number:
          <input required />
        </label>
        <br />
        <br />
        <label data-test-id="checkout-expiration-date">
          Expiration Date:
          <input required />
        </label>
        <label data-test-id="checkout-security-code">
          CVV Code:
          <input required />
        </label>
        <br />
        <br />
        <Link href="/thankyou">
          <a>
            <button data-test-id="checkout-confirm-order">Confirm</button>
          </a>
        </Link>
      </div>
    </Layout>
  );
}
