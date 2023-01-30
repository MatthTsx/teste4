'use client';

import { Get_Game } from '@/scripts/api/Board';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

function Buttons() {
  const {data} = useSession()
  const router = useRouter()
  const url = typeof window != 'undefined' ? window.location.origin : ""

  return (
    <div className='flex w-full justify-between'>
      <button className='_btn' onClick={() => {
        const sla = Get_Game(url,data?.user?.email)
        sla.then(res => res.json()).then(data => router.push(`/Game/${data}`))
      }}>Find Game</button>
      <button className='_btn hover:rotate-12'>create a room</button>
    </div>
  )
}

export default Buttons