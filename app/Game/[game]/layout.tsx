import React, { ReactElement } from 'react'

type PageProps = {
  children: ReactElement,
  params: {
    game: string
  }
}

async function RootLayout({children, params:{game}} : PageProps) {

  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default RootLayout