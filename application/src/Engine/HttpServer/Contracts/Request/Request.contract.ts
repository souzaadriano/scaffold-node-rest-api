import { Data } from "../../Entities/Data/Data.entity";
import { Headers } from "../../Entities/Headers/Headers.entity";
import { Params } from "../../Entities/Params/Params.entity";
import { Query } from "../../Entities/Query/Query.entity";
import { Uploads } from "../../Entities/Uploads/Uploads.entity";

export interface Request {
    get data(): Data
    get query(): Query
    get params(): Params
    get headers(): Headers
    get uploads(): Uploads
}

export namespace Request {
    export interface File {
        readonly name: string
        readonly type: string
        readonly size: number
        save(path: string): Promise<void>
        binary(): Promise<Buffer>
    }

    export type Constructor = new (...args: any[]) => Request;
}