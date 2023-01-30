'use client';
import { getSession, signIn, useSession } from 'next-auth/react';
import { NextPageContext } from 'next/types';
import React from 'react'

type Props = {
    children: React.ReactNode[],
}

function getRandom(multipliyer: number) {
    const random = Math.floor(Math.random() * multipliyer)
    return random
}

function Auth({children} : Props) {
    const {data : session} = useSession()
    
    if(!session) return <div>
        {children[0]}
        <div className='flex w-full space-y-2 py-5 flex-col items-center justify-center h-96 overflow-hidden relative'>
            <p className='font-bold tracking-widest text-2xl drop-shadow-xl text-cor2'>You are not sign-in</p>
            <button className='_btn hover:rotate-0 bg-cor2 px-2 shadow-xl text-xl' onClick={() => signIn()}>sign in</button>
            {[...Array(20)].map((item,i) => (
                <div key={i} className={`absolute -z-50  opacity-60 scale-[200%]`}
                style={{
                    top: getRandom(350),
                    right: getRandom(1250),
                }}
                >
                    {i%2 == 0? "🤣" : "😢"}</div>
            ))}
        </div>
    </div>

  return (
    <div className='w-full h-screen overflow-hidden'>
        {children}
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext){
    const session = getSession(context)
    return{
        props:session
    }
}

export default Auth