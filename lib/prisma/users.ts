import client from ".";

export async function getUser(email: string){
    const user = await client.user.findFirst({
        where: {
            email
        }
    });
    return {user}
}