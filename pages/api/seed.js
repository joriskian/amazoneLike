// seeding some data to Product's models

import nc from 'next-connect';
import Product from '../../models/Product';
import User from '../../models/User';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  /** before getting the products we need to connect to db */
  await db.connect();
  /** delette all entry */
  await Product.deleteMany();
  /** import all from utils/data.js */
  await Product.insertMany(data.products);
  /**disconnect db  */

  await User.deleteMany();

  await User.insertMany(data.users);

  await db.disconnect();
  /** send message */
  res.send({ message: 'seeded successfuly' });
});

export default handler;
