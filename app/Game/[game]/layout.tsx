import React, { JSXElementConstructor, ReactElement } from 'react'

function RootLayout({children} : {children:ReactElement<any, string | JSXElementConstructor<any>>}) {

  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default RootLayout