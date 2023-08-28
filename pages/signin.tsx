import { LoginLayout, LoginTopBar } from '../components/login'
import { NextRequest, NextResponse } from 'next/server'

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]";

export default function SignIn() {
  return (
    <div id="root">
      <LoginTopBar></LoginTopBar>
      <LoginLayout></LoginLayout>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}
