import Link from 'next/link'
import React from 'react'
import { Links } from '@/constants'

type Props = {
    children: React.ReactNode
}

function Header({children} : Props) {
  return (
    <header className='bg-cor2 flex px-5 py-3 justify-between max-h-24 h-16 items-center
    drop-shadow-xl'>
        <div>{children}</div>
        <nav className='flex space-x-3'>
            {Links.map((item,i) => (
                <Link key={i} href={item.path}
                className="hover:rotate-12 hover:scale-110 scale-95 transition-all
                p-1 font-semibold "
                > {item.tittle} </Link>
            ))}
        </nav>
    </header>
  )
}

export default Header