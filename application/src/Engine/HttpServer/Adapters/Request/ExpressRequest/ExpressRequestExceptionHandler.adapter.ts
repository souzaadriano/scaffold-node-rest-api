import { RequestExceptionHandler } from "@/Engine/HttpServer/Contracts/Request/RequestExceptionHandler.contract";
import { Response } from "@/Engine/HttpServer/Contracts/Response/Response.contract";
import { Exception } from "@/Global/Exception/Exception.global";

export class ExpressRequestExceptionHandler implements RequestExceptionHandler {
    private upgradeError(error: Error) {
        return new ExpressRequestExceptionHandler.UpgradedError(error)
    }

    private upgradedUnknownError(error: any) {
        return new ExpressRequestExceptionHandler.UpgradedUnknownError(error)
    }

    private handleExcpetion(exception: Exception) {
        console.error(exception)
        return ExpressRequestExceptionHandler.ExceptionCodeToHttpStatus[exception.status](exception)
    }

    async handle(error: any): Promise<Response.Package<any>> {
        if(typeof error !== 'object') return this.handleExcpetion(this.upgradeError(error))
        if(error.isException) return this.handleExcpetion(error)
        if(error instanceof Error) return this.handleExcpetion(this.upgradeError(error))

        console.error('unknown error', error)
        return this.handleExcpetion(this.upgradedUnknownError(error))
    }
}

export namespace ExpressRequestExceptionHandler {
    export const ExceptionCodeToHttpStatus = {
        [Exception.Code.ENGINE]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: 'Internal server error'
            }
        }),
        [Exception.Code.ENVIRONMENT]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: 'Internal server error'
            }
        }), 
        [Exception.Code.EXTERNAL]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: 'Internal server error'
            }
        }),
        [Exception.Code.FORBIDDEN]: (exception: Exception): Response.Package<any> => ({
            status: 403,
            payload: {
                ok: false,
                message: 'invalid email/password'
            }
        }),
        [Exception.Code.INPUT]: (exception: Exception): Response.Package<any> => ({
            status: 400,
            payload: {
                ok: false,
                message: exception.message
            }
        }),
        [Exception.Code.INTERNAL]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: 'Internal server error'
            }
        }),
        [Exception.Code.MOUNT]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: 'Internal server error'
            }
        }),
        [Exception.Code.NOT_FOUND]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: exception.message
            }
        }),
        [Exception.Code.UNAUTHORIZED]: (exception: Exception): Response.Package<any> => ({
            status: 401,
            payload: {
                ok: false,
                message: 'access unauthorized'
            }
        }),
        [Exception.Code.UNKNOWN]: (exception: Exception): Response.Package<any> => ({
            status: 500,
            payload: {
                ok: false,
                message: 'Internal server error'
            }
        })
    }
    
    @Exception.Status(Exception.Code.INTERNAL)
    @Exception.Tag('upgraded')
    export class UpgradedError extends Exception {
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
    export class UpgradedUnknownError extends Exception {
        constructor(error: any) {
            super(error.message, {
                unknownError: error
            })
            this.stack = error.stack
            this.name = error.name
        }
    }
}