// api for order details

import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();
//only authorisated people could use this api
handler.use(isAuth);

handler.get(async (req, res) => {
  /** before getting the products we need to connect to db */
  await db.connect();

  const order = await Order.findById(req.query.id);
  /**disconnect db  */
  await db.disconnect();
  /** send products */
  res.send(order);
});

export default handler;
