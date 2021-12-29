export interface Loader {
    readonly name: string
    readonly engine: string
    exec(): Promise<void>
}