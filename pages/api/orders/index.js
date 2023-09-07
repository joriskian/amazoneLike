import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  // define error on utils/error.js
  onError,
});
// only the authorisated people could use this api
handler.use(isAuth);
// api for creating order in backend
handler.post(async (req, res) => {
  await db.connect();
  // making a new instance of Order with the data receive
  const newOrder = new Order({
    ...req.body,
    // user has been  set inside utils/auth.js
    user: req.user._id,
  });
  // save it
  const order = await newOrder.save();
  // 201 = create status code
  res.status(201).send(order);
});

export default handler;
