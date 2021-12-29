import { Json } from "../Json/Json.global";

export class Exception extends Error {
    private readonly _state: Json.Document
    readonly title!: string
    readonly issuedAt!: Date
    readonly status!: Exception.Code
    readonly privateMessage!: string
    readonly tags!: string[]
    private _isException = true

    get isException() { return this._isException }

    constructor(message?: string, state?: Json.Document) {
        super(message)
        this._state = state ?? {}
        this.issuedAt = new Date()
    }

    get state() { return this._state }

    static create(error?: Error | Exception | any) {
        if(!error) return new Exception('Getted a empty error')
        if(typeof error !== 'object') return new Exception('Getted a string when shoud be an instance of Error', { error })
        if('isException' in error) return error as Exception
        const exception = new Exception(error.message ?? '')
        exception.stack = error.stack ?? ''
        
        return exception
    }
}

export namespace Exception {
    export interface Model {
        message: string
        state: Json.Document
    }

    export enum Code {
        ENGINE='enigne',
        INTERNAL='internal',
        UNKNOWN='unknown',
        INPUT='input',
        EXTERNAL='external',
        ENVIRONMENT='environment',
        FORBIDDEN='forbidden',
        UNAUTHORIZED='unauthorized',
        NOT_FOUND='not-found',
        MOUNT='mount'

    }

    export function Status(status: Code): Function {
        return (constructor: { new(...args: any[]): any }) => {
            return class extends constructor {
                readonly status = status
                _isException = true
                constructor(...args: any[]) {
                    super(...args)
                }
            }
        }
    }

    export function PrivateMessage(message: string): Function {
        return (constructor: { new(...args: any[]): any }) => {
            return class extends constructor {
                readonly privateMessage: string = message
                _isException = true
                constructor(...args: any[]) {
                    super(...args)
                }
            }
        }
    }

    export function Title(message: string): Function {
        return (constructor: { new(...args: any[]): any }) => {
            return class extends constructor {
                readonly title: string = message
                _isException = true
                constructor(...args: any[]) {
                    super(...args)
                }
            }
        }
    }
    
    export function Tag(...tag: string[]): Function {
        return (constructor: { new(...args: any[]): any }) => {
            return class extends constructor {
                readonly tags = tag ?? []
                _isException = true
                constructor(...args: any[]) {
                    super(...args)
                }
            }
        }
    }
}