import { RequestHandler } from "@/Engine/HttpServer/Contracts/Request/RequestHandler.contract";
import { Route } from "@/Engine/HttpServer/Entities/Route/Route.entity";
import Express from 'express'

export class ExpressRequestHandler implements RequestHandler<Express.Handler> {
    handler(Route: Route):Express.Handler  {
        return async (req, res, next) => {
            const request = new Route.request(req)
            const response = new Route.response({
                engine: res,
                nextController: next
            })
    
            try { return await Route.controller.handle(request, response) }
            catch (e) { return await response.send(await Route.exception.handle(e)) }
        }
    }
}