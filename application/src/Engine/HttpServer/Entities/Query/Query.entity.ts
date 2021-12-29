import { ParsedUrlQuery } from "querystring";

export class Query {
    readonly value: ParsedUrlQuery
    private constructor(data: ParsedUrlQuery) { this.value = data }
    toModel<T extends ParsedUrlQuery>(schema?: Query.Schema<T>): T {
        if(!schema) return this.value as T
        return schema(this.value)
    }

    static create(data: ParsedUrlQuery) {
        return new Query(data)
    }
}

export namespace Query {
    export type Schema<T extends ParsedUrlQuery> = (data: ParsedUrlQuery) => T
}