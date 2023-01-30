import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {type} = req.body

    if(type === "FIND"){
        try {
            var game: any
            const rand = Math.floor(Math.random() * 10)
            try {
                game = await client.game.findFirst({
                    where: {full: false},
                    select: {id:true, user1:{select:{email:true}}},
                })
                const {_email} = req.body
                await client.game.update({
                    where: {id: game.id},
                    data: {
                        user2:{
                            connect:{
                                email: _email,
                            }
                        },
                        full: true,
                        P1_Turn:`${rand >= 5? _email : game.user1.email}`
                    }
                })
                
            } catch (error) {
                const {_email} = req.body
                game = await client.game.create({
                    data: {
                        full: false,
                        user1: {
                            connect: {
                                email: _email
                            }
                        },
                        Board: {
                            create:{
                                P_Pieces:{
                                    create:[
                                        {},
                                        {}
                                    ]
                                },
                            }
                        }
                    }
                })
            }
            return res.status(200).json(game.id)

            
        } catch(error){
            return res.status(500).json({error: error})
        }
    }else if(type == "GET_BOARD"){
        try {
            const {id} = req.body
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
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({error:error})
        }
    }else if (type == "GET_TURN"){
        try {
            const {id} = req.body
            const turn = await client.game.findUnique({
                where:{id},
                select:{
                    P1_Turn:true,
                    user2:{
                        select:{
                            email:true
                        }
                    },
                    user1:{
                        select:{
                            email:true
                        }
                    }
                }
            })
            return res.status(200).json(turn)

        } catch (error) {}
    }else if(type == "GET_PIECES"){
        const {id,team} = req.body
        try {
            const Pieces = await client.game.findUnique({
                where:{id},
                select:{
                    Board:{
                        select:{
                            P_Pieces:{
                                take:1,
                                skip:team,
                                select:{pieces:true}
                            }
                        }
                    }
                }
            })
            return res.status(200).json(Pieces)
        } catch (error) {
            
        }
    }else if(type == "PLAY"){
        const {id,email,place,index,opponent,team} = req.body
        try {
            const game = await client.game.findFirst({
                where:{id},
                select:{
                    Board:{
                        select:{
                            Board:true,
                            P_Pieces:{
                                take:2,
                                skip:team,
                            }
                        }
                    },
                    id:true
                }
            })
            if(!game?.id){
                return res.status(200).json({error:"error"})
            }

            let Board_: string[] = game.Board.Board
            Board_[index] = place
            let Pieces_: boolean[] = game.Board.P_Pieces[0].pieces
            Pieces_[parseInt(place.slice(1)) - 1] = false

            await client.game.update({
                where:{id: game.id},
                data:{
                    P1_Turn: opponent,
                    Board:{
                        update:{
                            Board: Board_,
                            P_Pieces: {
                                update:{
                                    where:{id: game.Board.P_Pieces[0].id},
                                    data:{
                                        pieces: Pieces_
                                    }
                                }
                            }
                        }
                    }
                }
            })
            return res.status(200).json({message:"Success"})

        } catch (error) {
            
        }
    }
}