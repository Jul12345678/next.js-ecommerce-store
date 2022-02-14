import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';
import { getProducts } from '../util/database';

const cartStyle = css`
  margin: auto;
  text-align: center;
  position: relative;
`;

export default function ShoppingCart(props) {
  const [cartList, setCartList] = useState(props.cart);
  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject) => {
    function findName() {
      for (const singleProduct of props.products) {
        if (singleProduct.id === cookieObject.id) {
          return {
            ...cookieObject,
            name: singleProduct.name,
            price: singleProduct.price,
            id: singleProduct.id,
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

  function removeProductCart(id) {
    const cartValue = getParsedCookie('cart') || [];

    const updatedCookie = cartValue.filter(
      (cookieObject) => cookieObject.id !== id,
    );

    setParsedCookie('cart', updatedCookie);
    setCartList(updatedCookie);
  }

  function itemsCountUp(id) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject) => {
      if (cookieObject.id === id) {
        return { ...cookieObject, items: cookieObject.items + 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

  function itemsCountDown(id) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject) => {
      if (cookieObject.id === id) {
        if (cookieObject.items === 1) {
          return cookieObject;
        }
        return { ...cookieObject, items: cookieObject.items - 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

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
            <ul>
              <li>Name: {singleItem.name}</li>
              <li>Price: {singleItem.price}</li>
              <li>Total amount of items: {singleItem.items}</li>{' '}
              <button onClick={() => itemsCountDown(singleItem.id)}>- </button>
              {singleItem.items}
              <button onClick={() => itemsCountUp(singleItem.id)}>+ </button>
              <li>Price: {totalItemPrice}</li>
              <button onClick={() => removeProductCart(singleItem.id)}>
                {' '}
                Remove from cart{' '}
              </button>
            </ul>{' '}
          </div>
        );
      })}
      <div>Total Price: {totalPrice}</div>
      <Link href="/checkout">
        <a>
          <button data-test-id="cart-checkout">Buy</button>
        </a>
      </Link>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const cartCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartCookies);
  const productss = await getProducts();
  return {
    props: {
      products: productss,
      addedProduct: cart,
    },
  };
}
