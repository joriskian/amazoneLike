// authentification
// xxxxx.yyyyy.zzzzz
// Header Payload signature

//  header {
//   "alg": "HS256",
//   "typ": "JWT"

// https://jwt.io/#debugger-io
// }
import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    // data object
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    //secret key
    process.env.JWT_SECRET,
    // option
    {
      expiresIn: '30d',
    }
  );
};
console.log('signToken :', signToken);

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    //Bearer xxx => get only the token ==> xxx
    const token = authorization.slice(7, authorization.length);
    //const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        console.log('err : ', error);
        res.status(401).send({ message: ' token is not valid !!!' });
      } else {
        // set the req.user to the decode value
        // it contain the user id, name, email, isAdmin etc..
        req.user = decode;
        // call next to go to next middleware
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not supplied' });
  }
};

export { signToken, isAuth };
