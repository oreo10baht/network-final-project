export function isFriend(username:string,fusernames:string[]):boolean{
    const isfriend:boolean = fusernames.includes(username)
    console.log(isfriend,"check is friend")
    return isfriend
}