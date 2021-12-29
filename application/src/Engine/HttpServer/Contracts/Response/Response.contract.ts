export interface Response<T = any> {
    send(response: Response.Package<T>): Promise<void>
    continue(): Promise<void>
}

export namespace Response {
    export interface Package<T = any> {
        payload: T
        status: number
    }

    export enum Status {
        OK=200,
        NO_CONTENT=204,
        ACCEPT=201
    }

    export type Constructor = new (...args: any[]) => Response;
}