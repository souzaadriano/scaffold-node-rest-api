export interface Tool<T extends {} = {}> {
    readonly name: string
    readonly engine: string
    readonly tool: T
}