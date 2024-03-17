import { NextFunction, Request, Response } from "express"
import { APIError, HttpStatusCode } from "./CustomError"

const handleError = (message = 'something went wrong') => (e: unknown, req: Request, res: Response, _: NextFunction) => {
    if (e instanceof APIError) res.status(e.httpCode).json({ error: e.name })
    else if (e instanceof Error) res.status(HttpStatusCode.UNPROCESSIBLE_ENTITY).json({ error: e.message })
    else res.status(HttpStatusCode.UNPROCESSIBLE_ENTITY).json({ error: message })
}

export { handleError }