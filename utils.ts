export function checkIfDefined(data: any){
    if(!data) throw new Error("NOT_FOUND")
    else{
        delete data.deletedAt
        return
    }
}