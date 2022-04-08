import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';

export default function Shipping() {
  // we must redirect user to login screen
  const router = useRouter();

  // use the context
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  // if userInfo doesn't exist redirect to login and after redirect to shipping
  React.useEffect(() => {
    // Runs after the first render() lifecycle
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, []);

  return <div>Shipping page</div>;
}
