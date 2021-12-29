import { Request } from "@/Engine/HttpServer/Contracts/Request/Request.contract"
import { RequestController } from "@/Engine/HttpServer/Contracts/Request/RequestController.contract"
import { Response } from "@/Engine/HttpServer/Contracts/Response/Response.contract"


export class HealthCheckController implements RequestController {
    private constructor() {}

    static create() { return new HealthCheckController() }

    async handle(request: Request, response: Response<any>): Promise<void> {
        await response.send({
            status: Response.Status.OK,
            payload: {
                ok: true,
                message: 'healthy'
            }
        })
    }
}