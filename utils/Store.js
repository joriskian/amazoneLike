import jsCookie from 'js-cookie';
import { createContext, useReducer } from 'react';

// create context
export const Store = createContext();
// define inital state
const initialSate = {
  // recupere le cookie darkMode
  darkMode: jsCookie.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: jsCookie.get('cartItems')
      ? JSON.parse(jsCookie.get('cartItems'))
      : [],
  },
  user_info: {
    cartItems: jsCookie.get('userInfo')
      ? JSON.stringify(jsCookie.get('userInfo'))
      : null,
  },
};
// creating a reducer
function reducer(state, action) {
  switch (action.type) {
    // if action.type is DARK_MODE_ON
    case 'DARK_MODE_ON':
      // change the value of darkMode but keep the previous values of the state
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      // change the value of darkMode but keep the previous values of the state
      return { ...state, darkMode: false };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // saving cartItems's cookie
      jsCookie.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      jsCookie.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_LOGIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    }
    default:
      return state;
  }
}

// use reducer
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialSate);
  const value = { state, dispatch };
  // Store.Provider is a ReactComponent, is a wrapper for all the components of the application
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
  // by adding props.children we can use Store.Provider like a wrapper for all components, and all components inside the will have acces to the value and see the state of DARK_MODE and dispatch or change the value of darkMode to true or false
}
