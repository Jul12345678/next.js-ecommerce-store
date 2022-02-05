// [fileName] = kind of like a variable / description of information after slash in URL
import Head from 'next/head';
import Layout from '../../components/Layout';
import productsDataBase from '../../util/database';

export default function SingleProduct(props) {
  return (
    <Layout>
      <Head>
        <title>
          {props.product.name} ({props.product.type}){' '}
        </title>
        <meta
          description={`${props.product.name} is a ${props.product.type}`}
        />
      </Head>
      <h1>
        {props.product.name} ({props.product.type})
      </h1>
      <div>id: {props.product.id}</div>
      <div>name: {props.product.name}</div>
      <div>type: {props.product.type}</div>
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
