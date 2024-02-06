import { Request, Response } from 'express'
import { authParams } from '../lib/validation/auth'
import { APIError, HttpStatusCode } from '../helper/CustomError'
import passport from "passport"
import passportLocal from "passport-local"
import prisma from '../model/user'

const login = async (req: Request, res: Response) => {
    try {
        const userRequest = authParams.safeParse(req.body)
        if (!userRequest.success) new APIError('UNAUTHORISED', HttpStatusCode.UNAUTHORISED, true, 'Invalid Input params')

        const LocalStrategy = passportLocal.Strategy;

        passport.use(new LocalStrategy((username, password, done) => {
            // await prisma.user.findUnique({
            //     where: {
            //         username, password
            //     }
            // })
        }));
    }
    catch (e) {
        if (e instanceof APIError) res.status(e.httpCode).json({ error: e.message })
        else if (e instanceof Error) res.status(422).json({ error: e.message })
        else res.status(422).json({ error: 'Something went wrong' })
    }
}

export {
    login
}