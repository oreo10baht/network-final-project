export function isFriend(username:string,fusernames:string[]):boolean{
    return fusernames.includes(username)
}