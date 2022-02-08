import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';
import productsDataBase from '../util/database';

const cartStyle = css`
  margin: auto;
  text-align: center;
  position: relative;
`;

export default function ShoppingCart(props) {
  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject) => {
    function findName() {
      for (const singleProduct of props.products) {
        if (singleProduct.id === cookieObject.id) {
          return {
            ...cookieObject,
            name: singleProduct.name,
            price: singleProduct.price,
          };
        }
      }
    }
    return findName();
  });
  setParsedCookie('cart', newCookie);

  const totalPrice = newCookie.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.items;
  }, 0);

  console.log('totalPrice', totalPrice);
  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div css={cartStyle}>
        <h1>Shopping Cart</h1>
        <p>Shopping Cart</p>
      </div>
      {newCookie.map((singleItem) => {
        const totalItemPrice = singleItem.price * singleItem.items;
        return (
          <div key={singleItem.id}>
            {' '}
            id: {singleItem.id} name:{singleItem.name} price: {singleItem.price}{' '}
            Quantity: {singleItem.items} total price item: {totalItemPrice}
          </div>
        );
      })}
      <div>Total Price: {totalPrice}</div>
    </Layout>
  );
}
export function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  return {
    props: {
      products: productsDataBase,
      addedProduct: cart,
    },
  };
}
