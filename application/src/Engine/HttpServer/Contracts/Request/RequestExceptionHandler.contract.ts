import { Response } from "../Response/Response.contract";

export interface RequestExceptionHandler {
    handle(error: any): Promise<Response.Package>
}