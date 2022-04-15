import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import UseStyles from '../utils/styles';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // define classes
  const classes = UseStyles();
  // define the router from use router
  const router = useRouter();
  // setPaymentMethod: default value to empty string (hook)
  const [paymentMethod, setPaymentMethod] = useState('');
  // get the context
  const { state, dispatch } = useContext(Store);
  // from state get cart and from cart get shippingAdress
  const {
    cart: { shippingAddress },
  } = state;
  // for the useEffect function set the dependancy array to empty array to run it only after mounting this component
  useEffect(() => {
    // if shipping adress doesn't exist it's mean the user haven't filled the form yet
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      // set payment method to cookie.get('paymentMethod or empty string if not exist) : paymentMethod it's a setHook
      setPaymentMethod(jsCookie.get('paymentMethod') || '');
    }
  }, []);
  // define submitHandler, get even as a parameter and call prevent default ot prevent reloading the page
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    // if the user don't choose the payment method : use snackBar to show message
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required !!!', { variant: 'error' });
    } else {
      // good scenario : dispatch an action called :'SAVE_PAYMENT_METHOD' (with payload as hook paymentMethod)
      // we have to define this case in store.js
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      // save the cookie
      jsCookie.set('paymentMethod', paymentMethod); // JSON.stringify()?
      // route to placeOrder
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            {/* define button radio */}
            <FormControl component="fieldset">
              {/* value will be the hook that we define line 27 */}
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                // get the event and setPaymentMethod() to the value of  of the selected even's target
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                {/* define radio button inside the RadioGroup */}
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
