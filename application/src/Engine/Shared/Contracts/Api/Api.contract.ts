export interface Api {
    readonly name: string
    readonly engine: string
    exec(): Promise<void>
}