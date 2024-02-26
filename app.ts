/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import dotenv from 'dotenv'
import authRouter from './src/route/authRoute'
const passport = require('passport')
const app = express()
dotenv.config({ path: './config.env' })

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/auth', authRouter)

app.listen(3000, () => {
  console.log('server listening to port 3000')
})

export default app
