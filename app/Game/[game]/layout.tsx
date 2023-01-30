import React from 'react'

type PageProps = {
  children: React.ReactNode,
  params: {
    game: string
  }
}

async function layout({children, params:{game}} : PageProps) {

  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default layout