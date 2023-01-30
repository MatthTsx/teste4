import { getPieces } from '@/lib/prisma/game'
import React from 'react'
import Letter from './Letter'


async function Side({type,id}:{type:string,id:string}) {
    const pieces: Array<Boolean> | undefined = await getPieces(type=="o"?0:1,id)

    return (
        <div className='w-[25%] h-full items-center flex flex-col'>
            {pieces?.map((piece,i)=>(
                <div key={i} className={`w-32 h-32 flex items-center justify-center bg-cor2`}>
                    {piece &&
                    <Letter size={i+1} type={type}/>
                    }
                </div>
            ))}
        </div>
    )
}

export default Side