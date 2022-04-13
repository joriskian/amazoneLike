// mongodb object

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // database fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // with this second parameter( by having this setting) each record in product as create date and update date
  }
);

// if Product existe set the value in Product otherwise create a new one
const User = mongoose.models.User || mongoose.model('Users', userSchema);

export default User;
