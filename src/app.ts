import express from 'express'
import dotenv from 'dotenv'
import router from './route'
import passport from 'passport'
import { UserRole } from '@prisma/client'

require('./helper/passport-config')

const app = express()
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

app.use(cors())
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(5000, () => {
  console.log('server listening to port 5000')
})

export default app
function cors(): any {
  throw new Error('Function not implemented.')
}

