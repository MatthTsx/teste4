import React from 'react'

function RootLayout({children}:{children:React.ReactElement}) {
  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default RootLayout