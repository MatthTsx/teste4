import React from 'react'

type Props = {
    size: number,
    type: string
}

function Letter({ size, type }: Props) {
  return (
    <div className='w-full h-full justify-center flex items-center'>
      {type == "x"? 
      <div className='w-full h-full flex items-center justify-center relative'
      style={{
        width: `${size * 1.6}rem`,
        height: `${size * 1.6}rem`
      }}>
        <div className='w-[10%] h-[75%] bg-cor4 rounded-md rotate-45'/>
        <div className='w-[10%] h-[75%] bg-cor4 rounded-md -rotate-45 absolute'/>
      </div>
      :
      <div className='w-full h-full justify-center items-center flex'>
        <div className='w-24 h-24 rounded-full border-4 border-cor4'
        style={{
          width: `${size * 1.25}rem`,
          height: `${size * 1.25}rem`,
        }}/>
      </div>}
    </div>
  )
}

export default Letter