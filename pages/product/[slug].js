// [name].js to create a parameter
import { useRouter } from 'next/router';
import React from 'react';
import data from '../../utils/data';

export default function ProductScreen() {
  // utilise le router de next
  const router = useRouter();
  // recupere le slug
  const { slug } = router.query;
  const product = data.products.find((e) => e.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <h1> {product.name} </h1>
    </div>
  );
}
