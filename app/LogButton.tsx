'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function LogButton() {
    const {data : session} = useSession()

    if(!session) return <button onClick={() => signIn()} className="_btn">
        Sign In</button>

  return (
    <button onClick={() => signOut()} className="_btn">Sign out</button>
  )
}

export default LogButton