'use client'
import { GiveUp } from '@/scripts/api/Board'
import { usePathname } from 'next/navigation'
import React from 'react'

function GiverUp() {
    const id = usePathname()?.replace("/Game/","")
    const origin = typeof window != 'undefined'? window.location.origin : ""
  return (
    <button className='fixed bottom-8 cursor-pointer _btn z-[100000000000] hover:rotate-0'
        onClick={() => {
        GiveUp(id||"",origin)
    }}>Give up?</button>
  )
}

export default GiverUp