import { NextFunction, Request, Response } from 'express'
import { APIError, HttpStatusCode } from '../helper/CustomError'
import { IUser } from 'user'

const serializeUser = (user: IUser) => {
    const { password, ...neededFields } = user
    return {
        ...neededFields
    }
}

const profile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new APIError('Unauthorized', HttpStatusCode.UNAUTHORISED)
        res.status(HttpStatusCode.OK).json({ user: serializeUser(req.user) })
    }
    catch (e) {
        next(e)
    }
}

export {
    profile
}