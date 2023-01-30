export async function Get_Game(url: string, _email:string|null|undefined){
    return await fetch(`${url}/api/prisma/Game`,{
        method: "POST",
        body: JSON.stringify({_email, type:"FIND"}),
        headers: {'Content-type': "application/json"}
    })
}

export async function Get_Board(id:string|null|undefined,url:string){
    try {
        let data = await fetch(`${url}/api/prisma/Game`,{
            headers: {"Content-type": "application/json"},
            method: "POST",
            body: JSON.stringify({id, type:"GET_BOARD"})
        })
        data = await data.json()
        //@ts-ignore Só a tipagem q n ta eexclarecida
        return data.Board.Board
    } catch (error) {
        return [""]
    }
}

export async function Get_Turn(id:string|null|undefined,url:string,email:string|undefined|null){
    const isTurn = await fetch(`${url}/api/prisma/Game`,{
        headers:{"Content-type": "application/json"},
        method:"POST",
        body: JSON.stringify({id, type:"GET_TURN"})
    })
    let is
    let you
    let other
    await isTurn.json().then(data => {
        if(data.P1_Turn == email){
            is = true
        }else{
            is = false
        }
        if(email == data.user1.email){
            you = "o"
            other = data.user2.email
        }else{
            you = "x"
            other = data.user1.email
        }
    })
    const results = {
        isTurn: is,
        YourTeam: you,
        opponent: other
    }
    return results
}

export async function getPieces_(id:string,team:number,url:string){
    const response = await fetch(`${url}/api/prisma/Game`,{
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({id, team,type:"GET_PIECES"}),
        method:"POST",
    })
    let Pieces: {
        Board: {
            P_Pieces : {
                pieces: Array<Boolean>
            }[]
        }
    } | undefined
    await response.json().then(data => Pieces = data)
    return (Pieces?.Board.P_Pieces[0].pieces || [])
}

export async function Play(id:string,url:string,index:number,place:string,email:string,opponent:string,team:number){
    fetch(`${url}/api/prisma/Game`,{
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({id,index,place,email,opponent,type:"PLAY",team}),
        method:"POST",
    })
}

export async function GiveUp(id:string,url:string){
    await fetch(`${url}/api/prisma/GiveUp`,{
        headers: {"Content-type": "application/json"},
        body:JSON.stringify({id}),
        method:"POST",
    })
}