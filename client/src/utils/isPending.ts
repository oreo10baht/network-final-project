export function isPending(username:string,pusernames:string[]):boolean{
    return pusernames.includes(username)
}