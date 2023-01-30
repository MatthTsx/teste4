import { inGame } from '@/lib/prisma/game'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import React from 'react'
import Buttons2 from './buttons2'

async function Main({children}:{children:React.ReactNode}) {
    const session = await unstable_getServerSession(authOptions)
    const email = session?.user?.email
    
    let game = await inGame(email)
    
  return (
    <div className='w-[50%] bg-cor2 h-full flex flex-col items-center px-8'>
      <div className='h-fit w-full flex flex-col'>
        <div className='w-full flex flex-col items-center'>
          <h1 className='text-2xl font-bold tracking-wide'>Tic Tac Toe</h1>
          <p className='tracking-widest'>
            This game is petty much a tic tac toe, but a little bit differente</p>
        </div>
        
        <div className='h-96 w-full flex items-center justify-center'>
          <div className='relative w-32 h-32 hover:rotate-180 transition-all duration-700 flex items-center justify-center hover:scale-125'>
            <div className='w-4 h-32 bg-cor1 rotate-45 absolute rounded-md'/>
            <div className='w-4 h-32 bg-cor1 -rotate-45 absolute rounded-md'/>
            <div className='w-4 h-32 bg-cor1/20 rotate-[40deg] absolute rounded-md'/>
            <div className='w-4 h-32 bg-cor1/20 -rotate-[40deg] absolute rounded-md'/>
          </div>
        </div>
      </div>
      {game?
      <Buttons2 id={game}/>
      :children}
    </div>
  )
}

export default Main