import { Response } from "@/Engine/HttpServer/Contracts/Response/Response.contract";
import { Json } from "@/Global/Json/Json.global";
import Express from 'express'

export class ExpressResponseJSON implements Response<Json.Document> {
    private readonly engine: Express.Response
    private readonly nextController: Express.NextFunction

    constructor(model: ExpressResponseJSON.Model) {
        this.engine = model.engine
        this.nextController = model.nextController
    }

    async send(response: Response.Package<any>): Promise<void> {
        this.engine.status(response.status).json(response.payload)
    }
    
    async continue(): Promise<void> {
        this.nextController()
    }

    static create(engine: Express.Response, nextController: Express.NextFunction) {
        return new ExpressResponseJSON({ engine, nextController })
    }
}

export namespace ExpressResponseJSON {
    export type Model = {
        engine: Express.Response
        nextController: Express.NextFunction
    }
}