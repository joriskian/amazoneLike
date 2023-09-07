import { Button, Menu, MenuItem } from '@material-ui/core';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import UseStyles from '../utils/styles';
import { Store } from '../utils/Store';
import jsCookie from 'js-cookie';

const UserButton = () => {
  // router
  const router = useRouter();
  // context
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const classes = UseStyles();
  // state for anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    router.push('/');
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={loginClickHandler}
        className={classes.navbarButton}
        color="primary"
      >
        {userInfo.name || userInfo.cartItems.name}
      </Button>
      <div>user</div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={loginMenuCloseHandler}
      >
        <MenuItem onClick={loginMenuCloseHandler}>Profil</MenuItem>
        <MenuItem onClick={loginMenuCloseHandler}>Account</MenuItem>
        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserButton;
