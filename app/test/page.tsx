import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import React from 'react'

async function page() {
    const session = await unstable_getServerSession(authOptions)
    
  return (
    <div>page {session?.user?.name}</div>
  )
}

export default page