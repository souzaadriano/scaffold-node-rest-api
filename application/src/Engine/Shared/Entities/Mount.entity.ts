import { Api } from "../Contracts/Api/Api.contract"
import { Loader } from "../Contracts/Load/Loader.contract"

export class Mount {
    private readonly loaders: Loader[] = []
    private readonly apis: Api[] = []

    private constructor() {}

    static create() {
        return new Mount()
    }

    load(loader: Loader) {
        this.loaders.push(loader)
        return this
    }

    api(api: Api) {
        this.apis.push(api)
        return this
    }

    async run() {
        for(const loader of this.loaders) {
            await loader.exec()
            console.log(`[OK] ${loader.name} / ${loader.engine}`)
        }

        for(const api of this.apis) {
            await api.exec()
            console.log(`[OK] ${api.name} / ${api.engine}`)
        }

        'Application Mounted'
    }
}