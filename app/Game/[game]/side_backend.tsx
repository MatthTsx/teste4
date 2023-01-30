'use client'
import { sleep } from '@/lib/utils'
import { getPieces_ } from '@/scripts/api/Board'
import React, { useEffect } from 'react'

type Props = {
    id:string | undefined,
    url: string,
    Team: number,
    func: Function
}

function Side_backend({id,url,Team,func}:Props) {
    const [pieces, setPieces] = React.useState<Array<Boolean>>()
    const [reload,setReload] = React.useState<Boolean>(true)
    const [chosen,setChosen] = React.useState<number | undefined>()

    useEffect(() => {
        sleep(100).then(() => {
            setBackend()
            let re = new Boolean(true)
            setReload(re)
        })
    },[reload])
    
    async function setBackend(){
        setPieces(await getPieces_(id||"",Team,url))
    }

  return (
    <div className='w-[25%] h-full items-center flex flex-col'>
            {pieces?.map((piece,i)=>(
                <div key={i} className={`w-32 h-32 flex items-center justify-center opacity-20`}
                style={chosen == i?{
                    backgroundColor: "#E76F51"
                }: {}}>
                    {piece == true &&
                    <button className='w-full h-full cursor-pointer'
                    onClick={() => {
                        let setter = Team == 0? "o" : 'x'
                        setChosen(i)
                        func(setter+(i+1))
                    }}/>}
                </div>
            ))}
    </div>
  )
}

export default Side_backend