import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  background-color: #eee;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;

  a + a {
    margin-left: 8px;
  }
`;
export default function Header() {
  return <header css={footerStyles}></header>;
}
