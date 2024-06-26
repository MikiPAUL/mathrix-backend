import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './route'
import passport from 'passport'
import { UserRole } from '@prisma/client'
import cors from 'cors'

const app = express()

const corsOptions = {
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

app.use(cors(corsOptions))

require('./helper/passport-config')

dotenv.config({ path: './config.env' })

declare global {
  namespace Express {
    interface User {
      id: number,
      role: UserRole,
      password: string,
      email: string,
      phoneNumber: string,
      name: string,
      userName: string
    }
    interface Request {
      userId: number
    }
  }
}
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(5000, () => {
  console.log('server listening to port 5000')
})

export default app

