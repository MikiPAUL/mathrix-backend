import prisma from '../model/user'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'mathrix-maths-department-symposium-2024-secret-key'
}

passport.use('login', new LocalStrategy({
  usernameField: 'auth[userName]',
  passwordField: 'auth[password]'
}, async (userName, password, done) => {
  try {
    const user = await prisma.user.find(userName)
    console.log(userName, password)
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    console.log(user)
    const validate = await prisma.user.validUser(userName, password)
    console.log(validate)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}),
)

passport.use(new JwtStrategy(opts, async (jwtPayload: any, done: any) => {
  try {
    console.log(jwtPayload)
    const user = await prisma.user.findUnique({ where: { id: jwtPayload.userId } })

    if (!user) {
      return done(null, false, { message: 'Not authorized' })
    }

    return done(null, user)
  } catch (err) {
    console.log(err)
    done(err, false)
  }
}))
