/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express'
const authController = require('./../controller/authController')
require('./../helper/passport-config')
const router = Router()
const passport = require('passport')

router.route('/login').post(authController.login)

router.route('/protect').get(passport.authenticate('jwt', { session: false }), (req: any, res: any) => {
  return res.status(200).send({
    success: true,
    user: {
      id: req.user.id,
      username: req.user.userName
    }

  })
})

router.route('/register').post(authController.register)

export default router
