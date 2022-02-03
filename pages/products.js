import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import products from '../util/database';

const productStyles = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

export default function Products(props) {
  console.log('props', JSON.stringify(props, null, 2));
  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta description="List of Products" />
      </Head>
      <h1>Products</h1>
      {props.products.map((product) => {
        return (
          <div key={`product- ${product.id}`} css={productStyles}>
            {/* Dynamic link /products/1, etc */}
            <Link href={`/products/${product.id}`}>
              <a>
                {product.name} is a {product.type}
              </a>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}
// http://localhost:3000/products/1

/* Code in getServersideProps only runs in Node.js, and allows you to read files from file system, connect to (real) database, etc.   */
export function getServerSideProps() {
  return {
    props: { products: products },
  };
}
