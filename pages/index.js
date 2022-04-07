import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import Layout from '../components/layout';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Home(props) {
  // recupère le router de next
  const router = useRouter();
  // use dispatch // get context
  const { state, dispatch } = useContext(Store);
  const { products } = props;

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('sorry, no more product in stock !!!');
      return;
    }
    // find the quantity (via state) for the current product
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    // if exist :  update else just put 1
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // redirect users to cart Screen
    router.push('/cart');
  };
  return (
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {/*no more need{data.products.map((product) => (  */}
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              {/* NextLink pour router */}
              <NextLink href={`/product/${product.slug}`} passHref>
                {/* pour les rendre cliquable */}
                <CardActionArea>
                  {/* pour gerer les images */}
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>

              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
                >
                  Add to card
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

/**
 * If you export a function called getServerSideProps (Server-Side Rendering)
 * from a page, Next.js will pre-render this page on each request using the data
 *  returned by getServerSideProps.
 */

export async function getServerSideProps() {
  await db.connect();
  // must put .lean() function do get a POJO ( a Javascript Objet !!!)
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }, // will be passed to the page component as props
  };
}
