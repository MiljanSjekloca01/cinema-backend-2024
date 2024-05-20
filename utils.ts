export function checkIfDefined(data: any): any{
    if(!data) throw new Error("NOT_FOUND")
    else{
        delete data.deletedAt
        return data;
    }
}

export function checkIfModelHasData(model: any,...requiredArguments: string[]){
    requiredArguments.forEach(attribute => {
        if(!model[attribute]){
            throw new Error(`Error ! Missing ${attribute} field`)
        }
    })
}