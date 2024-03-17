import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from "../model/user"
import { IUser } from "user"
import { APIError, HttpStatusCode } from "./CustomError"
import passport from 'passport'
import bcrypt from 'bcryptjs'
import type { User } from '@prisma/client'

const generateToken = (user: IUser) => {
    const jwtSecret = process.env['TOKEN_SECRET_KEY'] || 'mathrix-maths-department-symposium-2024-secret-key' as string
    return jwt.sign({ userId: user.id, userName: user.userName }, jwtSecret, {})
}

const validateToken = async (token: string) => {
    const decoded = jwt.verify(token, process.env['TOKEN_SECRET_KEY'] || 'mathrix-maths-department-symposium-2024-secret-key') as JwtPayload
    const { userId } = decoded

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) throw new APIError('User not found', HttpStatusCode.NOT_FOUND)

    return { userId: parseInt(userId) }
}

const hashPassword = async (password: string) => {
    if (!password) {
        throw new Error('Password was not provided')
    }

    const salt = await bcrypt.genSalt(14)
    return await bcrypt.hash(password, salt)
}

const setup = () => {
    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } })
            return done(null, user)
        } catch (err) {
            return done(err, null)
        }
    })
}

const signToken = (user: User) => {
    return jwt.sign({ data: user }, process.env['JWT_SECRET'] || 'secret', {})
}


export {
    generateToken,
    validateToken,
    hashPassword,
    signToken,
    setup
}