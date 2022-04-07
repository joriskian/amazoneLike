import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import Layout from '../components/Layout';
import UseStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';

// react component must begin with capital letter
export default function Login() {
  const router = useRouter();
  const redirect = router.query;
  // use the context
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  // si userInfo exist no need to go to login page
  if (userInfo) {
    router.push('/');
  }
  const classes = UseStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      // save data in react context
      dispatch({ type: 'USER_LOGIN', payload: data });
      jsCookie.set('userInfo', data);
      router.push(redirect || '/');
      alert('succes login');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="E-Mail"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              LOGIN
            </Button>
          </ListItem>
          <ListItem>
            Don't have a account ? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
