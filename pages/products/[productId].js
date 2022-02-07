import { css } from '@emotion/react';
// [fileName] = kind of like a variable / description of information after slash in URL
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import productsDataBase from '../../util/database';

const productContentStyle = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  align-items: center;
  position: absolute;
  margin-left: 660px;
`;
const productTitleStyle = css`
  margin-left: 660px;
`;
export default function SingleProduct(props) {
  return (
    <Layout>
      <Head>
        <title>
          {props.product.name} ({props.product.type}){' '}
        </title>
        <meta description={`${props.product.name}  ${props.product.type}`} />
      </Head>
      <div>
        <NextLink href="/products" passHref>
          <Link>Back to products</Link>
        </NextLink>
      </div>
      <h1 css={productTitleStyle}>
        {props.product.name} ({props.product.type})
      </h1>
      <section css={productContentStyle}>
        <div>
          <Image
            src={`/spongebob/${props.product.id}${props.product.imageType}`}
            width={props.product.width}
            height={props.product.height}
          />
        </div>
        <div>Id: {props.product.id}</div>
        <div>Name: {props.product.name}</div>
        <div>Type: {props.product.type}</div>
      </section>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const productId = context.query.productId;
  console.log('db', productsDataBase);
  const matchingProduct = productsDataBase.find((product) => {
    return product.id === productId;
  });

  return {
    props: {
      product: matchingProduct,
    },
  };
}
