import { Route } from "@/Engine/HttpServer/Entities/Route/Route.entity";
import Express from 'express'
import { MiddlewareHandler } from "../../Contracts/MiddlewareHandler/MiddlewareHandler.contract";

export class ExpressMiddlewareHandler implements MiddlewareHandler<Express.Handler> {
    handler(Route: Route): Express.Handler[]  {
        return Route.middleware.map((middleware) => {
            return async (req, res, next) => {
                const request = new Route.request(req)
                const response = new Route.response(res, next)
        
                try { return await middleware.handle(request, response) }
                catch (e) { return await response.send(await Route.exception.handle(e)) }
            }
        })
    }
}