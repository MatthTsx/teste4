import React, { ReactElement } from 'react'

async function RootLayout({children} : {children: ReactElement}) {

  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default RootLayout