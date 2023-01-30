import client from '@/lib/prisma'
import { getBoard, onGame } from '@/lib/prisma/game'
import { sleep } from '@/lib/utils'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import CheckWin from '@/scripts/utils/checkWin'
import { unstable_getServerSession } from 'next-auth'
import React from 'react'
import Letter from './Letter'

interface PageProps{
    children: React.ReactNode[]
}

interface Props extends PageProps{
    id: string,
}



async function Main({id,children}:Props) {
    const dame: Array<String> = await getBoard(id) as Array<String>
    const session = await unstable_getServerSession(authOptions)
    const board = dame.map((i) => i[0])
    const ganho:string = await CheckWin(board) || ""

    if(ganho != ""){
        sleep(200).then(async () => {
            await client.game.update({
                where:{
                    id
                },
                data:{
                    user1:{disconnect:true},
                    user2:{disconnect:true},
                    P1_Turn:""
                }
            })
        })
    }

  return (
    <div className='w-[50%] bg-cor2 h-full flex flex-col items-center px-8'>
        <div className='w-full flex flex-col items-center h-16 justify-center'>
            <h1 className='text-2xl font-bold tracking-wide'>Tic Tac Toe</h1>
            <p className='tracking-widest'>
            This game is petty much a tic tac toe, but a little bit differente</p>
        </div>
        <div className='flex flex-col w-full items-center justify-center h-[80%]'>
            {await onGame(session?.user?.email,id) && ganho == "" && children[0]}
            <div className='w-32 h-96 absolute z-50 border-r-2 border-l-2 border-cor5'/>
            <div className='w-32 h-96 absolute z-50 border-r-2 border-l-2 border-cor5 rotate-90'/>
            {[...Array(3)].map((col,i) => (
                <div key={i} className="flex">
                    {[...Array(3)].map((piece,_i) => (
                        <div key={_i} className="w-32 h-32 flex items-center justify-center">
                            {dame[_i + 3*i] == '0' ? null :
                            <Letter size={parseInt(dame[_i + 3*i].slice(1))} type={dame[_i+3*i][0]}/>}
                        </div>
                    ))}
            </div>
        ))}
        </div>
        {await onGame(session?.user?.email,id) && children[1]}
    </div>
  )
}

export default Main