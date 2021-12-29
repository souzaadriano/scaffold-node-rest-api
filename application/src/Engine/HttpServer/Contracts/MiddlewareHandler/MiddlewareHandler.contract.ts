import { Route } from "../../Entities/Route/Route.entity";

export interface MiddlewareHandler<T> {
    handler(route: Route): T[]
}