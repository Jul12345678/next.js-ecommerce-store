import { css } from '@emotion/react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';
import { getProducts } from '../util/database';

const entireCard = css`
  margin-left: 150px;
`;
const cardImage = css`
  height: 150px;
  margin-bottom: -125px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;
const cartStyle = css`
  margin: auto;
  text-align: center;
  position: relative;
`;
const cartItemsStyle = css``;
export default function ShoppingCart(props) {
  const [cartList, setCartList] = useState(props.cart);
  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject) => {
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

  const totalPrice = newCookie.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.items;
  }, 0);

  function removeProductCart(id) {
    const cartValue = getParsedCookie('cart') || [];

    const updatedCookie = cartValue.filter(
      (cookieObject) => cookieObject.id !== id,
    );

    setParsedCookie('cart', updatedCookie);
    setCartList(updatedCookie);
  }

  function itemsCountUp(id) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject) => {
      if (cookieObject.id === id) {
        return { ...cookieObject, items: cookieObject.items + 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

  function itemsCountDown(id) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject) => {
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
      </Head>
      <div css={cartStyle}>
        <h1>Shopping Cart</h1>
      </div>

      <Grid item md={3}>
        {newCookie.map((singleItem) => {
          const totalItemPrice = singleItem.price * singleItem.items;
          return (
            <div key={singleItem.id} css={cartItemsStyle}>
              <table>
                <Grid item md={15}>
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
                          <button onClick={() => itemsCountDown(singleItem.id)}>
                            -{' '}
                          </button>
                          {singleItem.items}
                          <button onClick={() => itemsCountUp(singleItem.id)}>
                            +{' '}
                          </button>
                          <br />
                          <th>Price: {totalItemPrice}</th>
                          <button
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

      <div>Total Price: {totalPrice}</div>
      <Link href="/checkout">
        <a>
          <button data-test-id="cart-checkout">Buy</button>
        </a>
      </Link>
    </Layout>
  );
}
export async function getServerSideProps(context) {
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
