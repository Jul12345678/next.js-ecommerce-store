import { css } from '@emotion/react';
import Link from 'next/link';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';

const headerStyles = css`
  background-color: #f7e948;
  padding: 10px 15px;
  border-radius: 10px;
  margin: 8px 8px 20px;

  a + a {
    margin-left: 860px;
    position: relative;
    margin-right: -70px;
  }
`;
export default function Header() {
  const cookieValue = getParsedCookie('cart') || [];
  console.log('CookieValue', cookieValue);
  const totalQuantity = cookieValue.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.items;
  }, 0);
  console.log('totalQuantity', totalQuantity);
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/cart">
        <a>Shopping Cart</a>
      </Link>
    </header>
  );
}
export function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  return {
    props: {
      addedProducts: cart,
    },
  };
}
