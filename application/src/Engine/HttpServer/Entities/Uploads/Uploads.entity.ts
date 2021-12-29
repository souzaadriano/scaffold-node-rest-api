import { Request } from "../../Contracts/Request/Request.contract"

export class Uploads {
    readonly haveFile: boolean
    readonly value: NodeJS.Dict<Request.File>

    private constructor(data: NodeJS.Dict<Request.File>) {
        this.value = data
    }

    toModel<T extends NodeJS.Dict<Request.File>>(schema?: Uploads.Schema<T>) {
        if(!schema) return this.value as T
        return schema(this.value)
    }

    static create(data: NodeJS.Dict<Request.File>) {
        return new Uploads(data)
    }
}

export namespace Uploads {
    export type Schema<T extends NodeJS.Dict<Request.File>> = (data: NodeJS.Dict<Request.File>) => T
}