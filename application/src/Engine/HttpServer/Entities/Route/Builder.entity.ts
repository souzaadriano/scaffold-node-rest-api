import { Request } from "../../Contracts/Request/Request.contract"
import { RequestController } from "../../Contracts/Request/RequestController.contract"
import { RequestExceptionHandler } from "../../Contracts/Request/RequestExceptionHandler.contract"
import { Response } from "../../Contracts/Response/Response.contract"
import { Route } from "./Route.entity"

export class Builder {
    private readonly baseUrl: string
    private readonly _routes: Route[] = []
    private readonly baseMiddlewares: RequestController[]
    private readonly request: Request.Constructor
    private readonly response: Response.Constructor
    private readonly exception: RequestExceptionHandler


    private constructor(model: Builder.Model) {
        this.baseUrl = model.baseUrl
        this.baseMiddlewares = model.middleware
        this.request = model.request
        this.response = model.response
        this.exception = model.exception
    }


    static build(model: Builder.BuildModel) {
        return new Builder({
            baseUrl: Builder.sanitizeBaseUrl(model.baseUrl),
            middleware: model.middleware ?? [],
            exception: model.exception,
            request: model.request,
            response: model.response
        })
    }

    private resolveUrl(url?: string) {
        if(!url) return this.baseUrl
        
        const base = this.baseUrl.endsWith('/')
        const append = url.startsWith('/')
        
        if(base && append) return `${this.baseUrl}${url.substring(1)}`
        if(!base && !append) return `${this.baseUrl}/${url}`

        return `${this.baseUrl}${url}`
    }

    private appendBaseMiddlewares(middleware?: RequestController[]): RequestController[] {
        const middlewares = middleware ?? []
        return [...this.baseMiddlewares, ...middlewares]
    }

    add(route: Route | Builder) {
        if('routes' in route) this._routes.push(...route.routes)
        else this._routes.push(route)
        
        return this
    }

    get(model: Builder.RouteModel) {
        const route = Route.create({
            request: model.request ?? this.request,
            response: model.response ?? this.response,
            exception: model.exception ?? this.exception,
            url: this.resolveUrl(model.url),
            method: Route.Method.GET,
            middleware: this.appendBaseMiddlewares(this.baseMiddlewares),
            controller: model.controller
        })

        return this.add(route)
    }

    post(model: Builder.RouteModel) {
        const route = Route.create({
            request: model.request ?? this.request,
            response: model.response ?? this.response,
            exception: model.exception ?? this.exception,
            url: this.resolveUrl(model.url),
            method: Route.Method.POST,
            middleware: this.appendBaseMiddlewares(this.baseMiddlewares),
            controller: model.controller
        })

        return this.add(route)
    }

    patch(model: Builder.RouteModel) {
        const route = Route.create({
            request: model.request ?? this.request,
            response: model.response ?? this.response,
            exception: model.exception ?? this.exception,
            url: this.resolveUrl(model.url),
            method: Route.Method.PATCH,
            middleware: this.appendBaseMiddlewares(this.baseMiddlewares),
            controller: model.controller
        })

        return this.add(route)
    }

    put(model: Builder.RouteModel) {
        const route = Route.create({
            request: model.request ?? this.request,
            response: model.response ?? this.response,
            exception: model.exception ?? this.exception,
            url: this.resolveUrl(model.url),
            method: Route.Method.PUT,
            middleware: this.appendBaseMiddlewares(this.baseMiddlewares),
            controller: model.controller
        })

        return this.add(route)
    }

    delete(model: Builder.RouteModel) {
        const route = Route.create({
            request: model.request ?? this.request,
            response: model.response ?? this.response,
            exception: model.exception ?? this.exception,
            url: this.resolveUrl(model.url),
            method: Route.Method.DELETE,
            middleware: this.appendBaseMiddlewares(this.baseMiddlewares),
            controller: model.controller
        })

        return this.add(route)
    }

    route(model: Builder.AddRouteModel) {
        const route = Route.create({
            request: model.request ?? this.request,
            response: model.response ?? this.response,
            exception: model.exception ?? this.exception,
            url: this.resolveUrl(model.url),
            method: model.method,
            middleware: this.appendBaseMiddlewares(this.baseMiddlewares),
            controller: model.controller
        })

        return this.add(route)
    }

    get routes() {
        return this._routes
    }
}

export namespace Builder {
    export function removeLastSlash(url: string) {
        const size = url.length
        return url.substring(0, (size - 1))
    }

    export function sanitizeBaseUrl(url: string) {
        const startsWithSlash = url.startsWith('/')
        const endsWithSlash = url.endsWith('/')

        if(startsWithSlash && endsWithSlash) return Builder.removeLastSlash(url)
        if(!startsWithSlash && endsWithSlash) return ('/' + Builder.removeLastSlash(url))
        if(!startsWithSlash && !endsWithSlash) return ('/' + url)
        return url
    }

    export type Model = Required<Pick<Route.CreateModel, 'middleware' | 'exception' | 'request' | 'response'>> & {
        baseUrl: string
    }

    export type BuildModel = Pick<Route.CreateModel, 'middleware' | 'exception' | 'request' | 'response'> & {
        baseUrl: string
    }

    //export type CreateModel = Required<Pick<Route.CreateModel, 'middleware'>>

    export type RouteModel = Partial<Omit<Route.CreateModel, 'method' | 'url' | 'controller'>> & {
        url?: string
        controller: RequestController
    }

    export type AddRouteModel = RouteModel & { method: Route.Method }
}