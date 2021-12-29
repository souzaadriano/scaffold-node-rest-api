import { Json } from "@/Global/Json/Json.global";

export class Data {
    readonly value: Json.Document
    private constructor(data: Json.Document) { this.value = data }

    toModel<T extends Json.Document>(schema?: Data.Schema<T>): T {
        if(!schema) return this.value as T
        return schema(this.value)
    }

    static create(data: Json.Document) {
        return new Data(data)
    }
}

export namespace Data {
    export type Schema<T extends Json.Document> = (data: Json.Document) => T
}