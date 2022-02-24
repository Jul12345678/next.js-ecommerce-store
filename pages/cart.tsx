import { css } from '@emotion/react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Cart,
  CartProduct,
  getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
import { getProducts, Product } from '../util/database';

const minusButtonStyle = css`
  margin-top: 2px;
  margin-right: 5px;
  padding-top: 0px;
  box-sizing: border-box;
  border-width: 1px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  display: inline-block;
`;
const addButtonStyle = css`
  margin-top: 5px;
  margin-left: 5px;
  padding-top: 0px;
  box-sizing: border-box;
  border-width: 1px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  display: inline-block;
`;
const cardsToGrid = css`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 500px 500px 500px;
`;
const removeButtonStyle = css`
  margin-top: px;
  padding: 3px;
  box-sizing: border-box;
  border-width: 1px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  display: inline-block;
`;

const buyButtonStyle = css`
  margin-left: 50px;
`;
const totalPriceStyle = css`
  margin-left: 50px;
`;

const entireCard = css`
  margin-left: 40px;
  margin-top: 30px;
`;
const cardImage = css`
  height: 150px;
  margin-bottom: -135px;
`;
const cartStyle = css`
  margin-top: 50px;
  margin-left: 60px;
  position: relative;
`;
type Props = {
  products: Product[];
  cart: Cart;
};

type Crd = {
  CardMedia: Array<String>;
  component: string;
  image: string;
};
const cartItemsStyle = css``;
export default function ShoppingCart(props: Props) {
  const [cartList, setCartList] = useState(props.cart);
  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject: CartProduct) => {
    function findName() {
      for (const singleProduct of props.products) {
        if (singleProduct.id === cookieObject.id) {
          return {
            ...cookieObject,
            name: singleProduct.name,
            price: singleProduct.price,
            id: singleProduct.id,
            image: singleProduct.image,
          };
        }
      }
    }
    return findName();
  });
  setParsedCookie('cart', newCookie);

  const totalPrice = newCookie.reduce(
    (previousValue: number, currentValue: CartProduct) => {
      return previousValue + currentValue.price * currentValue.items;
    },
    0,
  );

  function removeProductCart(id: number) {
    const cartValue = getParsedCookie('cart') || [];

    const updatedCookie = cartValue.filter(
      (cookieObject: CartProduct) => cookieObject.id !== id,
    );

    setParsedCookie('cart', updatedCookie);
    setCartList(updatedCookie);
  }

  function itemsCountUp(id: number) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject: CartProduct) => {
      if (cookieObject.id === id) {
        return { ...cookieObject, items: cookieObject.items + 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

  function itemsCountDown(id: number) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject: CartProduct) => {
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
        <meta name="description" content="Products Cart" />
      </Head>
      <div css={cartStyle}>
        <h1>Shopping Cart</h1>
      </div>

      <Grid css={cardsToGrid} item md={5}>
        {newCookie.map((singleItem: CartProduct) => {
          const totalItemPrice = singleItem.price * singleItem.items;
          return (
            <div key={singleItem.id} css={cartItemsStyle}>
              <table>
                <Grid md={20}>
                  <Card css={entireCard}>
                    <tr>
                      <th>
                        {' '}
                        <CardMedia
                          css={cardImage}
                          component="img"
                          image={singleItem.image}
                          name={singleItem.name}
                          price={singleItem.price}
                        />
                      </th>
                      <CardContent>
                        <Typography>
                          Name: {singleItem.name}
                          <br />
                          Price: {singleItem.price}
                          <br />
                          <button
                            css={minusButtonStyle}
                            onClick={() => itemsCountDown(singleItem.id)}
                          >
                            -{' '}
                          </button>
                          {singleItem.items}
                          <button
                            css={addButtonStyle}
                            onClick={() => itemsCountUp(singleItem.id)}
                          >
                            +{' '}
                          </button>
                          <br />
                          <p>Total Price: {totalItemPrice}</p>
                          <button
                            css={removeButtonStyle}
                            onClick={() => removeProductCart(singleItem.id)}
                          >
                            Remove from cart
                          </button>{' '}
                        </Typography>
                      </CardContent>
                    </tr>
                  </Card>
                </Grid>{' '}
              </table>
            </div>
          );
        })}
      </Grid>

      <div css={totalPriceStyle}>Total Price: {totalPrice}</div>
      <Link href="/checkout">
        <a>
          <button css={buyButtonStyle} data-test-id="cart-checkout">
            Buy
          </button>
        </a>
      </Link>
    </Layout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
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
