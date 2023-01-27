'use client';

import React from 'react'
import { SessionProvider } from "next-auth/react"
import Auth from './Auth';

type Props = {
    children: React.ReactNode | React.ReactNode[]
}

function Providers({children} : Props) {
  return (
    <SessionProvider>
        {/* @ts-ignore */}
        <Auth>
            {children}
        </Auth>
    </SessionProvider>
  )
}

export default Providers