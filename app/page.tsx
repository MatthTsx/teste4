import { getUser } from '@/lib/prisma/users'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import React from 'react'

async function Home() {
  const session = await unstable_getServerSession(authOptions)
  const user = await getUser(session?.user?.email as string)
  return (
    <div>Home {user.user?.id}</div>
  )
}

export default Home