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

const productCards = css`
  height: 40vh;
`;
const productStyles = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
`;
const productsPageStyle = css`
  border-radius: 5px;
  padding: 15px;
  margin-top: -10px;
  margin-bottom: 20px;
  align-items: center;
  margin-left: 840px;
`;
type Props = {
  products: Product;
  cart: Cart;
  map: any;
};

export default function Products(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  function toggleProductCart(id: number | string) {
    const cookieValue = getParsedCookie('cart') || [];

    const existIdOnArray = cookieValue.some((cookieObject: CartProduct) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      newCookie = cookieValue.filter(
        (cookieObject: CartProduct) => cookieObject.id !== id,
      );
    } else {
      newCookie = [...cookieValue, { id: id, items: 1 }];
    }
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <h1 css={productsPageStyle}>Products</h1>
      <Grid container spacing={3}>
        {props.products.map((product: Product) => {
          const productIsAdded = cartList.some((addedObject) => {
            return addedObject.id === product.id;
          });
          return (
            <Grid item md={4} key={product.name}>
              <Card>
                <Link href={`/products/${product.id}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      css={productCards}
                      component="img"
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>
                        <div
                          data-test-id={`product-${product.id}`}
                          css={productStyles}
                        >
                          {/* Dynamic link /products/1, etc */}
                          <Link href={`/products/${product.id}`}>
                            <a>
                              {product.name} ({product.type})
                            </a>
                          </Link>{' '}
                        </div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => toggleProductCart(product.id)}
                  >
                    {productIsAdded ? 'Remove from cart' : 'Add to cart'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      ;
    </Layout>
  );
}
// http://localhost:3000/products/1

/* Code in getServersideProps only runs in Node.js, and allows you to read files from file system, connect to (real) database, etc.   */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartCookies);

  const productss = await getProducts();

  return {
    props: {
      products: productss,
      cart,
    },
  };
}
