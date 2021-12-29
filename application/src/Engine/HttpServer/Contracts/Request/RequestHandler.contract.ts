import { Route } from "../../Entities/Route/Route.entity";

export interface RequestHandler<T> {
    handler(route: Route): T
}