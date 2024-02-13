/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = { jwtFromRequest: '', secretOrKey: '' }
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'mathrix-maths-department-symposium-2024-secret-key'

passport.use(new JwtStrategy(opts, async function (jwt_payload: any, done: any) {
  try {
    const user = await prisma.user.findUnique({ where: { id: jwt_payload.id } })

    if (!user) {
      return done(null, false, { message: 'Not authorized' })
    }

    return done(null, user)
  } catch (err) {
    console.log(err)
    done(err, false)
  }
}))
