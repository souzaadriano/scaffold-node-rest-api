export class Params {
    readonly value: NodeJS.Dict<string>
    private constructor(data: NodeJS.Dict<string>) { this.value = data }
    toModel<T extends NodeJS.Dict<string>>(schema?: Params.Schema<T>): T {
        if(!schema) return this.value as T
        return schema(this.value)
    }

    static create(data: NodeJS.Dict<string>) {
        return new Params(data)
    }
}

export namespace Params {
    export type Schema<T extends NodeJS.Dict<string>> = (data: NodeJS.Dict<string>) => T
}