import React from 'react';
import { useRouter } from 'next/router';

export default function Shipping() {
  // we must redirect user to login screen
  const router = useRouter();
  router.push('/loggin');
  return <div>shipping</div>;
}
