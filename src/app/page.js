'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import GifListPage from './giflist/page';
import Signin from './signin/page';
export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  return (
      <Signin/>
  )
}

Home.requireAuth = true