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

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <div>
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
                  <Button size="small" color="primary">
                    Add to card
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
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
