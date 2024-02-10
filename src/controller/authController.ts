/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

exports.login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({ where: { userName: username } })

    if (!user) {
      return res.status(400).json({
        message: 'No user found'
      })
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    console.log(password, isPasswordMatched)
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: 'Password incorrect'
      })
    }

    const jwtSecret: string = process.env.JWT_SECRET as string
    const token = jwt.sign({ id: user?.id, username: user.userName }, jwtSecret, {})
    return res.status(400).json({
      message: 'Login succesfull',
      token,
      user
    })
  }
  catch (e) {
    res.status(400).json({ error: 'Something went wrong', e })
  }
}

exports.register = async (req: Request, res: Response) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber

    const hashedPassword = await bcrypt.hash(password, 14)
    const user = await prisma.user.create({
      data: {
        name,
        userName: username,
        password: hashedPassword,
        email,
        phoneNumber
      }
    })

    res.status(200).json({
      message: 'registered successfully',
      user
    })
  } catch (err) {
    res.status(400).json({
      message: 'Something went wrong',
      err
    })
  }
}
