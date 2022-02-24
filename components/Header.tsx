import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { CartProduct, getParsedCookie } from '../util/cookies';

const headerStyles = css`
  background-color: #f7e948;
  padding: 10px 15px;
  border-radius: 10px;
  margin: 8px 8px 20px;

  a + a {
    margin-left: 860px;
    position: relative;
    margin-right: -110px;
  }
`;

export default function Header() {
  const cookieValue = getParsedCookie('cart') || [];
  console.log('CookieValue', cookieValue);
  const quantity = cookieValue.reduce(
    (previousValue: number, currentValue: CartProduct) => {
      return previousValue + currentValue.items;
    },
    0,
  );
  console.log('Quantity', quantity);
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/cart">
        <a>Shopping Cart ({isNaN(quantity) ? '0' : quantity})</a>
      </Link>
    </header>
  );
}
export function getServerSideProps(context: GetServerSidePropsContext) {
  const cartCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartCookies);

  return {
    props: {
      cart,
    },
  };
}