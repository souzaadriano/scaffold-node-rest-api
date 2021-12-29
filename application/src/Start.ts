import { setup, Options } from "./Main/Setup/Setup"

const main = async () => {
    await setup[Options.REST_API]()
}

main().catch(console.error)