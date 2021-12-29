import { ExpressMiddlewareHandler } from "@/Engine/HttpServer/Adapters/MiddlewareHandler/ExpressMiddlewareHandler.adapter";
import { ExpressRequestHandler } from "@/Engine/HttpServer/Adapters/Request/ExpressRequest/ExpressRequestHandler.adapter";
import { HttpServerEngine } from "@/Engine/HttpServer/HttpServer.engine";
import { Environment } from "@/Global/Environment/Environment.global";
import { router } from "./Routes/Routes";

const HTTP_SERVER_PORT = Environment('HTTP_SERVER_PORT', 80)
const UPLOAD_TEMP_DIR = Environment('UPLOAD_TEMP_DIR', '/temp')

HttpServerEngine.setup({
    port: HTTP_SERVER_PORT,
    tempDir: UPLOAD_TEMP_DIR,
    router: router
})

export const httpServer = HttpServerEngine.create({
    middlewareHandler: new ExpressMiddlewareHandler(),
    requestHandler: new ExpressRequestHandler()
})