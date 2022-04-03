// mongodb object

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // database fields
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true, // with this second parameter( by having this setting) each record in product as create date and update date
  }
);

// if Product existe set the value in Product otherwise create a new one
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
