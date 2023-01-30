import client from ".";

export async function inGame(email:string|null|undefined){
    const Game = await client.game.findFirst({
        where: {
            OR:[{user1:{email}},
                {user2:{email}}]
        }
    })
    if(Game == null){
        return false
    }else{
        return Game.id
    }
}

export async function onGame(email:string|null|undefined,id:string|undefined){
    try {
        const game = await client.game.findFirst({
            where: {
                id,
                OR:[
                    {user1:{email}},
                    {user2:{email}}
                ]
            },
            select:{
                id:true
            }
        })
        if(game != null){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

export async function getBoard(id:string|undefined){
    try {
        const data = await client.game.findUnique({
            where:{id},
            select:{
                Board:{
                    select:{
                        Board:true
                    }
                }
            }
        })
        return data?.Board.Board
    } catch (error) {
        return ["","","","","","","","",""]
    }
}

export async function getPieces(player:number,id:string){
    var pieces
    try {
        pieces = await client.game.findUnique({
            where:{id},
            select:{
                Board:{
                    select:{
                        P_Pieces:{
                            take:1,
                            skip:player,
                            select:{
                                pieces:true
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        
    }
    return pieces?.Board.P_Pieces[0].pieces
}