import { Mount } from "@/Engine/Shared/Entities/Mount.entity"
import { httpServer } from "./HttpServer.setup"

export enum Options {
    'REST_API'='restApi'
}

export const setup = {
    [Options.REST_API]: async () => {
        return Mount.create()
                    .api(httpServer)
                    .run()
                    .catch(console.error)
    }
}