import { Exception } from "@/Global/Exception/Exception.global";
export interface ExceptionHandler<EnginePayload> {
    handle(exception: unknown): EnginePayload
}

export namespace ExceptionHandler {
    @Exception.Status(Exception.Code.INTERNAL)
    @Exception.Tag('upgraded')
    class UpgradedError extends Exception {
        constructor(error: Error) {
            super(error.message, {
                errorName: error.name,
                errorMessage: error.message,
                errorStack: error.stack ?? ''
            })
            this.stack = error.stack
            this.name = error.name
        }
    }

    @Exception.Status(Exception.Code.INTERNAL)
    @Exception.Tag('upgraded', 'unknown')
    class UpgradedUnknownError extends Exception {
        constructor(error: any) {
            super(error.message, {
                unknownError: error
            })
            this.stack = error.stack
            this.name = error.name
        }
    }

    function isException(exception: any) {
        if(exception.isException === true) return exception as Exception
        return null
    }

    function isError(exception: unknown) {
        if(exception instanceof Error) return new UpgradedError(exception)
        return null
    }

    function isUnknown(exception: unknown) {
        return new UpgradedUnknownError(exception)
    }

    export function normalizeException(exception: unknown) {
        let currentException = isException(exception)
        if(currentException) return currentException
        currentException = isError(exception)
        if(currentException) return currentException
        return isUnknown(exception)
    }
}