// mongodb object
// create model for orders
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    // database fields
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAdress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    payedAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true, // with this second parameter( by having this setting) each record in product as create date and update date
  }
);

// if Product existe set the value in Product otherwise create a new one
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
