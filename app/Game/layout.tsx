import React, { JSXElementConstructor } from 'react'

function RootLayout({children}:{children:React.ReactElement<any, string | JSXElementConstructor<any>>}) {
  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default RootLayout