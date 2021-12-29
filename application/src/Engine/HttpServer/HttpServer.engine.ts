import Express, { request } from 'express'
import cors from 'cors'
import { Route } from './Entities/Route/Route.entity'
import { RequestHandler } from './Contracts/Request/RequestHandler.contract'
import { MiddlewareHandler } from './Contracts/MiddlewareHandler/MiddlewareHandler.contract'
import { Api } from '../Shared/Contracts/Api/Api.contract'
import { StartBeforeSetupError } from '../Shared/Exceptions/StartBeforeSetupError'
import { Router } from './Entities/Route/Router.entity'
//import fileUpload from 'express-fileupload'


export class HttpServerEngine implements Api {
    readonly name = HttpServerEngine.name
    readonly engine = 'Express'
    private readonly express: Express.Application = Express()
    private readonly requestHandler: RequestHandler<Express.Handler>
    private readonly middlewareHandler: MiddlewareHandler<Express.Handler>
    private readonly routes: Route[] | Route[][]
    private readonly port: number
    private readonly tempDir: string
    private static _setup: boolean
    private static routes: Route[] | Route[][]
    private static tempDir: string
    private static port: number

    private constructor({ middlewareHandler, requestHandler, routes, tempDir, port }: HttpServerEngine.Model) {
        this.requestHandler = requestHandler
        this.middlewareHandler = middlewareHandler
        this.routes = routes
        this.tempDir = tempDir
        this.port = port
    }

    static setup({ router, tempDir, port }: HttpServerEngine.Setup) {
        this.routes = router.routes
        this.tempDir = tempDir
        this.port = port
        this._setup = true
    }

    static create(dependencies: HttpServerEngine.Dependencies) {
        if(this._setup === false) throw new StartBeforeSetupError(HttpServerEngine.name)
        
        return new HttpServerEngine({
            requestHandler: dependencies.requestHandler,
            middlewareHandler: dependencies.middlewareHandler,
            routes: this.routes,
            tempDir: this.tempDir,
            port: this.port
        })
    }

    private async setRoutes() {
        const expressRouter = Express.Router()
        const router = HttpServerEngine.router(expressRouter)
        const flatRoutes = this.routes.flat(2)
        for(const route of flatRoutes) {
            const requestHandler = this.requestHandler.handler(route)
            const requestMiddlewares = this.middlewareHandler.handler(route)
            router[route.method](route.url, requestHandler, requestMiddlewares)
        }
        
        this.express.use('/', expressRouter)
    }

    private async setMiddleware() {
        this.express.use(cors())
        this.express.use(Express.urlencoded({ extended: true }))
        this.express.use(Express.json())
        // remove this coments if you need a file upload
        //this.express.use(fileUpload({
        //    abortOnLimit: true,
        //    safeFileNames: true,
        //    preserveExtension: true,
        //    useTempFiles: true,
        //    tempFileDir: this.tempDir
        //}))
    }

    private async listen() {
        return this.express.listen(this.port, () => {
            console.log(`Http server listening on port ${this.port}`)
        })
    }
    
    async exec(): Promise<void> {
        await this.setMiddleware()
        await this.setRoutes()
        await this.listen()
    }
}

export namespace HttpServerEngine {
    export type Model = Omit<Setup, 'router'> & Dependencies & {
        routes: Route[] | Route[][]
    }

    export type Dependencies = {
        requestHandler: RequestHandler<Express.Handler>
        middlewareHandler: MiddlewareHandler<Express.Handler>
    }

    export type Setup = {
        port: number
        router: Router
        tempDir: string
    }

    export const router = (router: Express.Router) => ({
        [Route.Method.GET]: (url: string, handler: Express.Handler, middleware: Express.Handler[]) => router.get(url, ...middleware, handler),
        [Route.Method.POST]: (url: string, handler: Express.Handler, middleware: Express.Handler[]) => router.post(url, ...middleware, handler),
        [Route.Method.PUT]: (url: string, handler: Express.Handler, middleware: Express.Handler[]) => router.put(url, ...middleware, handler),
        [Route.Method.PATCH]: (url: string, handler: Express.Handler, middleware: Express.Handler[]) => router.patch(url, ...middleware, handler),
        [Route.Method.DELETE]: (url: string, handler: Express.Handler, middleware: Express.Handler[]) => router.delete(url, ...middleware, handler),
    })
}