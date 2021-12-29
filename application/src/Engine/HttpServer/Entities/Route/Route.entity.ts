import { RequestController } from "../../Contracts/Request/RequestController.contract"
import { Request } from "../../Contracts/Request/Request.contract"
import { Response } from "../../Contracts/Response/Response.contract"
import { RequestExceptionHandler } from "../../Contracts/Request/RequestExceptionHandler.contract"
import { Builder } from "./Builder.entity"
import { Router } from "./Router.entity"

export class Route {
    readonly url: string
    readonly method: Route.Method
    readonly controller: RequestController
    readonly middleware: RequestController[]
    readonly response: Response.Constructor
    readonly request: Request.Constructor
    readonly exception: RequestExceptionHandler

    constructor(model: Route.Model) {
        this.url = model.url
        this.method = model.method
        this.controller = model.controller
        this.middleware = model.middleware
        this.response = model.response
        this.request = model.request
        this.exception = model.exception
    }

    static create(model: Route.CreateModel) {
        return new Route({
            url: model.url,
            method: model.method,
            controller: model.controller,
            middleware: model.middleware ?? [],
            response: model.response,
            request: model.request,
            exception: model.exception,
        })
    }

    static get build() { return Builder.build }
    static get router() { return Router.create }
}

export namespace Route {
    export interface Model {
        url: string
        method: Route.Method
        controller: RequestController
        middleware: RequestController[]
        response: Response.Constructor
        request: Request.Constructor
        exception: RequestExceptionHandler
    }

    export type CreateModel = Omit<Model, 'middleware'> & {
        middleware?: RequestController[]
    }

    export enum Method {
        GET='GET',
        POST='POST',
        PUT='PUT',
        PATCH='PATCH',
        DELETE='DELETE'
    }
}