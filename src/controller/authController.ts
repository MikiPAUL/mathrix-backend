import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { APIError, HttpStatusCode } from '../helper/CustomError'
import { loginParams } from '../lib/validation/auth'
import prisma from '../model/user'
import { handleError } from '../helper/errorHandler'
import { createUserParams } from '../lib/validation/user'
import { generateToken, hashPassword } from '../helper/authHelper'
import { User } from '@prisma/client'
import { IUser } from 'user'

const serializeUser = (user: IUser) => {
  const { password, ...neededFields } = user
  return {
    ...neededFields
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new APIError('Unauthorized', HttpStatusCode.UNAUTHORISED)
    res.setHeader('Authorization', `Bearer ${generateToken(req.user)}`)
    return res.status(HttpStatusCode.CREATED).json({
      user: serializeUser(req.user)
    })
  }
  catch (e) {
    next(e)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserRequest = createUserParams.safeParse(req.body)
    if (!createUserRequest.success) throw new APIError('Invalid request body', HttpStatusCode.BAD_REQUEST)

    const { userName, password, email, phoneNumber, name } = createUserRequest.data.user
    const hashedPassword = await hashPassword(password)
    console.log(password, hashedPassword)
    const user = await prisma.user.add({ userName, email, phoneNumber, name, password: hashedPassword })

    res.setHeader('token', generateToken(user))
    return res.status(HttpStatusCode.CREATED).json({
      user: serializeUser(user)
    })
  } catch (e) {
    next(e)
  }
}

export {
  login,
  register
}