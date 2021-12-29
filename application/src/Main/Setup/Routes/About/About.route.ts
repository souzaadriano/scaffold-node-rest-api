import { ExpressRequest } from '@/Engine/HttpServer/Adapters/Request/ExpressRequest/ExpressRequest.adapter'
import { ExpressRequestExceptionHandler } from '@/Engine/HttpServer/Adapters/Request/ExpressRequest/ExpressRequestExceptionHandler.adapter'
import { ExpressResponseJSON } from '@/Engine/HttpServer/Adapters/Response/ExpressRequest/ExpressResponse.adapter'
import { Route } from '@/Engine/HttpServer/Entities/Route/Route.entity'
import { HealthCheckController } from './HealthCheck.controller'

const AboutRoutes = Route.build({
    baseUrl: '/about',
    exception: new ExpressRequestExceptionHandler(),
    request: ExpressRequest,
    response: ExpressResponseJSON,
})

AboutRoutes.get({
    url: '/health',
    controller: HealthCheckController.create(),
    middleware: []
})

export { AboutRoutes }