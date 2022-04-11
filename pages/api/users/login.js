import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  /** before getting the products we need to connect to db */
  await db.connect();
  /** {} : return all without any filter */
  const user = await User.findOne({ email: req.body.email });
  /**disconnect db  */
  await db.disconnect();
  /** send products */
  //   if user exist checked the password
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // generate the token
    const token = signToken(user);

    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'invalid email or password !' });
  }
});

export default handler;
