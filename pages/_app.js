import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // prevent the default styles with server-side-rendering in material-ui
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles); // remove the style if exist
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
