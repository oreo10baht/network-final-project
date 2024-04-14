export function isFriend(id:string,fids:string[]):boolean{
    const isfriend:boolean = fids.includes(id)
    console.log(isfriend,"check is friend")
    return isfriend
}