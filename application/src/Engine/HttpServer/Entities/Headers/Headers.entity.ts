export class Headers {
    readonly value: NodeJS.Dict<string>

    private constructor(data: NodeJS.Dict<string>) { this.value = data }

    toModel<T extends NodeJS.Dict<string>>(schema?: Headers.Schema<T>): T {
        if(!schema) return this.value as T
        return schema(this.value)
    }

    static create(data: NodeJS.Dict<string>) {
        return new Headers(data)
    }
}

export namespace Headers {
    export type Schema<T extends NodeJS.Dict<string>> = (data: NodeJS.Dict<string>) => T
}