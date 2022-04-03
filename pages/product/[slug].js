// [name].js to create a parameter

import React from 'react';

import Layout from '../../components/Layout';
import NextLink from 'next/link';
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import UseStyles from '../../utils/styles';
import Image from 'next/image';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function ProductScreen(props) {
  // fetch  product  from getServerSideProps
  const { product } = props;
  // recupère les styles
  const classes = UseStyles();

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        {/* md = middle of the screen occupied 3 half extraSmall full width */}
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              {/* SEO : the most important part of the webpage must be  'h1' to respect the serachEngine optimazation guideline */}
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>{' '}
              {/* must change the variant to use material-ui theme  */}
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description :{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>€{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In Stock' : 'Unavalaible'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  // must put .lean() function do get a POJO ( a Javascript Objet !!!)
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    }, // will be passed to the page component as props
  };
}
