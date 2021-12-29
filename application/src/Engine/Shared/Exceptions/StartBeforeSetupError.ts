import { Exception } from "@/Global/Exception/Exception.global";

@Exception.Status(Exception.Code.MOUNT)
export class StartBeforeSetupError extends Exception {
    constructor(engine?: string, ) {
        super(`to start before run setup to prepare ${engine ?? 'engine'}`)
    }
}