import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  /** before getting the products we need to connect to db */
  await db.connect();
  /** {} : return all without any filter */
  const product = await Product.findById(req.query.id);
  /**disconnect db  */
  await db.disconnect();
  /** send products */
  res.send(product);
});

export default handler;
