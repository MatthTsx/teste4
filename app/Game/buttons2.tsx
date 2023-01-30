import Link from 'next/link'
import React from 'react'

function Buttons2({id}:{id:string}) {
  return (
    <Link href={`/Game/${id}`} className='_btn hover:rotate-0'>Join Game</Link>
  )
}

export default Buttons2