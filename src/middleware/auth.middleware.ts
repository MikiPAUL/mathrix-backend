import { NextFunction, Request, Response } from 'express'
import { validateToken } from '../helper/authHelper'
import { APIError, HttpStatusCode } from '../helper/CustomError'
import { handleError } from '../helper/errorHandler'

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        if (!token) throw new APIError('Invalid token', HttpStatusCode.BAD_REQUEST)

        const { userId } = await validateToken(token)
        req.userId = userId

        next()
    }
    catch (e) {
        next(e)
    }
}

const checkIsInRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new APIError('User not found', HttpStatusCode.UNAUTHORISED)
        console.log('here')
        const hasRole = roles.find(role => req.user?.role === role)
        if (!hasRole) throw new APIError('Unauthorized', HttpStatusCode.UNAUTHORISED)
        console.log(req.user)
        return next()
    }
    catch (e) {
        next(e)
    }
}


export { authUser, checkIsInRole }