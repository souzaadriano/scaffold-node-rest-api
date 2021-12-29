export class Json<Model extends Json.Document> {
    static readonly parse = JSON.parse
    static readonly stringify = JSON.stringify
    private readonly _model: Json.Document
    private constructor(model: Json.Document) {
        this._model = model
    }

    get document() { return this._model }
    get model() { return this._model as Model }

    static create<Model extends Json.Document>(document: Json.Document) {
        return new Json<Model>(document)
    }

    private static jsonToString(input: string | Buffer) {
        if(typeof input === 'string') return input
        return input.toString('utf8')
    }

    static parseToJson<Model extends Json.Document>(input: string | Buffer) {
        const content = this.jsonToString(input)
        const document = this.parse(content)
        return this.create<Model>(document)
    }
}

export namespace Json {
    export type PrimitivePropertie = string | number | boolean | null;
    export type Propertie = PrimitivePropertie | Document | Collection;
    export interface Collection extends Array<Propertie> {}
    export interface Document { [member: string]: Propertie };
}