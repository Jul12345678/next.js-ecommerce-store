import { css } from '@emotion/react';
// [fileName] = kind of like a variable / description of information after slash in URL
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import NextLink from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies.ts';
import { getProduct } from '../../util/database';

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
  const [cartList, setCartList] = useState(props.cart);

  function toggleCart(id) {
    const cookieValue = getParsedCookie('cart') || [];
    const existIdOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      newCookie = cookieValue.filter((cookieObject) => cookieObject.id !== id);
    } else {
      newCookie = [...cookieValue, { id: id, items: 1 }];
    }
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  const productIsAdded = cartList.some((addedObject) => {
    return addedObject.id === props.product.id;
  });

  const currentProduct = cartList.find(
    (cookieObject) => cookieObject.id === props.product.id,
  );

  function addProduct() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject) => {
      if (cookieObject.id === props.product.id) {
        return { ...cookieObject, items: cookieObject.items + 1 };
      } else {
        return cookieObject;
      }
    });
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  function removeProduct() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject) => {
      if (cookieObject.id === props.product.id) {
        if (cookieObject.items === 1) {
          return cookieObject;
        }
        return { ...cookieObject, items: cookieObject.items - 1 };
      } else {
        return cookieObject;
      }
    });
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }
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
            data-test-id="product-image"
            src={`${props.product.image}`}
            width={`700%`}
            height={`500%`}
          />
        </div>

        <div>Name: {props.product.name}</div>
        <div>Type: {props.product.type}</div>
        <div data-test-id="product-price">Price: {props.product.price}$</div>

        <button
          data-test-id="product-add-to-cart"
          onClick={() => toggleCart(props.product.id)}
        >
          {productIsAdded ? 'Remove from cart' : 'Add to cart'}
        </button>
        {currentProduct && (
          <div data-test-id="product-quantity">
            <button
              data-test-id="decrease-quantity"
              onClick={() => removeProduct()}
            >
              -{' '}
            </button>
            {currentProduct.items}
            <button
              data-test-id="increase-quantity"
              onClick={() => addProduct()}
            >
              +{' '}
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
// for database import "async" before function
export async function getServerSideProps(context) {
  const productId = context.query.productId;

  //  const matchingProduct = productsDataBase.find((product) => {
  //    return product.id === productId;
  //  });
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  const productsss = await getProduct(productId);

  /*
     This then for database
  */
  // const product = await getProduct(productId)
  return {
    props: {
      product: productsss,
      cart,
      // product: product,
    },
  };
}
// images have to be put into database
