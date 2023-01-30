

export default async function CheckWin(board:Array<string>){
    let pos
    let res: string = ""
    let retur = ""
    pos = [board.slice(0,3),board.slice(3,6),board.slice(6,9)]
    pos.forEach(async (e) => {
        res = ""
        e.forEach((i) => {
            res = res + i
        })
        if(check(res) != ""){
            retur = check(res)
            return
        }
    })
    if(retur != ""){
        return retur
    }
    for(let a = 0; a<3; a++ ){
        res = ""
        for(let i = 0; i<3; i++){
            res += pos[i][a]
        }
        if(check(res) != ""){
            retur = check(res)
            return retur
        }
    }
    if(retur != ""){
        return retur
    }
    res = ""
    for(let i = 0; i<3; i++){
        res += pos[i][i]
    }
    if(check(res) != ""){
        retur = check(res)
        return retur
    }
    res = ""
    for(let i = 2; i>=0; i--){
        res += pos[i][i]
    }
    if(check(res) != ""){
        retur = check(res)
        return retur
    }


    return retur
}

function check(value: string){
    if(value == "xxx"){
        return 'x'
    }else if(value == "ooo"){
        return 'o'
    }else{
        return ""
    }
}