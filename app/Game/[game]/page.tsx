import client from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
import Backend from './backend'
import GiverUp from './giveUp'
import Main from './main'
import Refresh from './reflesh'
import RefreshProvider from './reflesh_Provider'
import Side from './side'


type PageProps = {
    params: {
        game: string
    }
}

async function page({params: {game}}:PageProps) {
  let full
  try {
    full = await client.game.findUnique({
      where: {id: game},
      select:{
        full:true,
        Ganho: true
      }
    })
    if(full == null){
      return notFound()
    }
  } catch (error) {
    return notFound()
  }

  return (
    <div className='w-full flex justify-center'>
      <RefreshProvider>
        <Refresh/>
      </RefreshProvider>
      {/* @ts-ignore */}
      <Side type={"o"} id={game}/>
      {/* @ts-ignore */}
      <Main id={game}>
        {full?.full && !full.Ganho &&
        <Backend/>
      }
        <GiverUp/>
      </Main>
      {/* @ts-ignore */}
      <Side type={"x"} id={game}/>
    </div>
  )
}

export default page