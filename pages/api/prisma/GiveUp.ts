import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/prisma";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        const {id} = req.body
        await client.game.update({
            where:{id},
            data:{
                user1:{
                    disconnect:true
                },
                user2:{
                    disconnect:true
                },
                P1_Turn:""
            }
        })
    }catch(e){}
}