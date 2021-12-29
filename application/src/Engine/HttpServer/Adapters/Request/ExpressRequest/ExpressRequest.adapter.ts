import { Request } from "@/Engine/HttpServer/Contracts/Request/Request.contract";
import { ParsedUrlQuery } from "querystring";
import { UploadedFile as ExpressUploadedFile } from 'express-fileupload'
import 'express-fileupload';
import Express from 'express';
import { Data } from "@/Engine/HttpServer/Entities/Data/Data.entity";
import { Headers } from "@/Engine/HttpServer/Entities/Headers/Headers.entity";
import { Params } from "@/Engine/HttpServer/Entities/Params/Params.entity";
import { Query } from "@/Engine/HttpServer/Entities/Query/Query.entity";
import { Uploads } from "@/Engine/HttpServer/Entities/Uploads/Uploads.entity";

export class ExpressRequest implements Request {
    private readonly _data: Data
    private readonly _query: Query
    private readonly _params: Params
    private readonly _headers: Headers
    private readonly _uploads: Uploads

    constructor(model: ExpressRequest.Model) {
        this._data = model.data
        this._query = model.query
        this._params = model.params
        this._headers = model.headers
        this._uploads = model.uploads
    }

    static create(request: Express.Request) {
        return new ExpressRequest({
            data: Data.create(request.body),
            headers: Headers.create(request.headers as NodeJS.Dict<string>),
            params: Params.create(request.params),
            query: Query.create(request.query as ParsedUrlQuery),
            uploads: Uploads.create(ExpressRequest.adaptExpressUpload(request.files as NodeJS.Dict<ExpressUploadedFile>))
        })
    }
    
    get data(): Data { return this._data }
    get query(): Query { return this._query }
    get params(): Params { return this._params }
    get headers(): Headers { return this._headers }
    get uploads(): Uploads { return this._uploads }
}

export namespace ExpressRequest {
    export type Model = {
        data: Data,
        query: Query,
        params: Params,
        headers: Headers
        uploads: Uploads
    }

    export class ExpressFile implements Request.File {
        private readonly file: ExpressUploadedFile

        constructor(file: ExpressUploadedFile) {
            this.file = file
        }

        get name(): string { return this.file.name }
        get size(): number { return this.file.size }
        get type(): string {
            const fileType = this.name.split('.')
            const lastPosition = (fileType.length - 1)
            return fileType[lastPosition] ?? 'unknown'
        }

        async save(path: string): Promise<void> {
            return new Promise((resolve, reject) => {
                this.file.mv(path, (err) => {
                    if(err) return reject(err)
                    resolve(undefined)
                })
            })
        }
        async binary(): Promise<Buffer> { return this.file.data }
    }

    export const adaptExpressUpload = (files?: NodeJS.Dict<ExpressUploadedFile>): NodeJS.Dict<Request.File> => {
        if(!files) return {}
        const uploads: NodeJS.Dict<ExpressFile> = {}
        for(const name in files) {
            const file = files[name]
            if(!file) continue
            uploads[name] = new ExpressFile(file) 
        }

        return uploads
    }
}