import React from 'react'

type Props = {
    children: React.ReactNode
}

function RefreshProvider({children} : Props) {
  return (
    <>
        {children}
    </>
  )
}

export default RefreshProvider