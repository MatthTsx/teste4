import React from 'react'

function layout({children}:{children:React.ReactElement}) {
  return (
    <div className='h-full w-full flex justify-center'>
      {children}
    </div>
  )
}

export default layout