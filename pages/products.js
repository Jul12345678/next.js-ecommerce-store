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
import NextLink from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import productsDataBase, { readProducts } from '../util/database';

const productStyles = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
`;
const productsPageStyle = css`
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 30px;
  align-items: center;
  margin-left: 870px;
`;
export default function Products(props) {
  const [cartList, setCartList] = useState(props.cart);

  function toggleProductCart(id) {
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

  return (
    <Layout>
      <Head>
        <title>Products</title>
        <meta description="List of Products" />
      </Head>
      <h1 css={productsPageStyle}>Products</h1>
      <Grid container spacing={3}>
        {props.products.map((product) => {
          const productIsAdded = cartList.some((addedObject) => {
            return addedObject.id === product.id;
          });
          return (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/products/${product.id}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>
                        <div key={`product-${product.id}`} css={productStyles}>
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
                </NextLink>
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
export async function getServerSideProps(context) {
  const cartCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartCookies);

  const productss = await readProducts();

  console.log(cart);
  return {
    props: {
      // to use database to import everything, also implement "image", "width", height, etc to database
      products: productsDataBase,
      productss: productss,
      cart,
    },
  };
}
