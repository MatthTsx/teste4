'use client'
import { sleep } from '@/lib/utils'
import { Get_Board, Get_Turn, GiveUp, Play } from '@/scripts/api/Board'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Side_backend from './side_backend'

function Backend() {
    const id = usePathname()?.replace("/Game/","")
    const [reload,setReload] = useState<Boolean>(false)
    const origin = typeof window != 'undefined'? window.location.origin : ""

    const {data: session} = useSession()

    const [Board, setBoard] = React.useState<Array<String>>(["n","n","n","n","n","n","n","n","n"])
    const [isTurn,setTurn] = useState(false)
    const [place, setPlace] = useState<string>("0")
    const [Team, setTeam] = useState("0")
    const [Opponent, setOpponent] = useState<string | undefined>()

    useEffect(() => {
        getBoard()
        sleep(100).then(() => {
            getBoard()
            const re = new Boolean(true)
            setReload(re)
        })
    },[reload])
    
    async function getBoard(){
        try {
            const Board = await Get_Board(id, origin)
            const turn = await Get_Turn(id,origin,session?.user?.email)
            setTurn(turn.isTurn || false)
            setBoard(Board)
            setTeam(turn.YourTeam || "0")
            setOpponent(turn.opponent)
        } catch (error) {
        }
    }

  return (
    <div className='w-full h-full absolute justify-center flex z-[1000]'>
        {Team == 'o'? isTurn &&
        <Side_backend id={id} url={origin} Team={0} func={setPlace}/>
        :<div className='w-[25%]'/>}
        <div className='w-[50%] bg-cor2/20 h-full flex flex-col items-center px-8'>
            <div className='flex flex-col w-full items-center justify-center h-[80%] mt-16 z-50'>
                {[...Array(3)].map((cos1,i) => (
                    <div key={i} className="flex">
                    {[...Array(3)].map((piece,_i) => (
                        <div key={_i} className={`w-32 h-32 flex items-center justify-center z-50 transition-all
                        ${isTurn && Board[_i+3*i]=='0' && place != "0" ? 'activate'
                        :Board[_i+3*i][0] != place[0] && Board[_i+3*i].slice(1) < place.slice(1) && isTurn &&
                        'activate_1'} opacity-0`}
                        onClick={async (e) => {
                            if(!isTurn){return}
                            if(place == "0") {return}
                            const elm = e.currentTarget as HTMLElement
                            const target = elm.childNodes[1].textContent as string
                            if(target[0] == place[0]) return
                            if(parseInt(target.slice(1)) >= parseInt(place.slice(1))) return
                            setTurn(false)
                            Play(id||"",origin,(_i+3*i),place,session?.user?.email||"",Opponent||"",Team=="o"?0:1)
                            setPlace('0')
                        }}
                        ><div className='w-[50%] h-[50%] bg-Cor3 opacity-20 rounded-full'/><span className='hidden'>{Board[_i+3*i]}</span></div>
                    ))}
            </div>
                ))}
            </div>
        </div>
        {Team == 'x'? isTurn &&
        <Side_backend id={id} url={origin} Team={1} func={setPlace}/>
        :<div className='w-[25%]'/>}
        <style>
            {`
                .activate:hover{
                    opacity: 1;
                    cursor: pointer
                }
                .activate_1:hover{
                    opacity: 1;
                    cursor: pointer
                }
                .activate_1 div{
                    background:red
                }
            `}
        </style>
    </div>
  )
}

export default Backend