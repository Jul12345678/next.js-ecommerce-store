import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  background-color: #f7e948;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;

  a + a {
    margin-left: 820px;
  }
`;
export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/about">
        <a>Shopping Cart</a>
      </Link>
    </header>
  );
}
