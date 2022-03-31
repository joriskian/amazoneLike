import jsCookie from 'js-cookie';
import { createContext, useReducer } from 'react';

// create context
export const Store = createContext();
// define inital state
const initalSate = {
  // recupere le cookie darkMode
  darkMode: jsCookie.get('darkMode') === 'ON' ? true : false,
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
    default:
      return state;
  }
}

// use reducer
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initalSate);
  const value = { state, dispatch };
  // Store.Provider is a ReactComponent, is a wrapper for all the components of the application
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
  // by adding props.children we can use Store.Provider like a wrapper for all components, and all components inside the will have acces to the value and see the state of DARK_MODE and dispatch or change the value of darkMode to true or false
}
