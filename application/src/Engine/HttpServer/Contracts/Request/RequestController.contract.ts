import { Request } from "./Request.contract";
import { Response } from "../Response/Response.contract";

export interface RequestController {
    handle(request: Request, response: Response): Promise<void>
}