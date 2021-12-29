import { Route } from "@/Engine/HttpServer/Entities/Route/Route.entity";
import { AboutRoutes } from "./About/About.route";

const router = Route.router()

router.add(AboutRoutes)

export { router }