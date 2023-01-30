'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { sleep } from '@/lib/utils'

function Refresh() {
    const router = useRouter()
    
    useEffect(() => {
        sleep(100).then(() => {
            router.refresh()
        })
    })

  return (
    <div className='hidden'/>
  )
}

export default Refresh