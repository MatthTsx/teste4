'use client';
import { getSession, signIn, useSession } from 'next-auth/react';
import { NextPageContext } from 'next/types';
import React from 'react'

type Props = {
    children: React.ReactNode | React.ReactNode[]
}

function Auth({children} : Props) {
    const {data : session} = useSession()

    if(!session) return <div>
        <button onClick={() => signIn()}>Sign In</button>
    </div>

  return (
    <>
        {children}
    </>
  )
}

export async function getServerSideProps(context: NextPageContext){
    const session = getSession(context)
    return{
        props:{session}
    }
}

export default Auth