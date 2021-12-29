import { Builder } from "./Builder.entity";
import { Route } from "./Route.entity";

export class Router {
    private readonly _routes: Route[] = []

    private constructor() {}

    static create() {
        return new Router()
    }

    add(builder: Builder) {
        this._routes.push(...builder.routes)
        return this
    }

    get routes() { return this._routes }
}