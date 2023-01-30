import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){

  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}