// [fileName] = kind of like a variable / description of information after slash in URL
import Head from 'next/head';
import Layout from '../../components/Layout';
import productDataBase from '../../util/database';

export default function SingleProduct(props) {
  return (
    <Layout>
      <Head>
        <title>
          {props.product.name} ({props.product.type})
        </title>
        <meta
          description={`${props.product.name} is a ${props.product.type}`}
        />
      </Head>
      <h1>
        {props.product.name} ({props.product.type})
      </h1>
      <div>id: {props.product.id}</div>
      <div>name: {props.name.id}</div>
      <div>type: {props.type.id}</div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const productId = context.query.productId;
  console.log('db', productDataBase);
  const matchingProduct = productDataBase.find((product) => {
    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
    if (product.id === productId) {
      return true;
    } else {
      return false;
    }
  });

  return {
    props: {
      product: matchingProduct[0],
    },
  };
}
