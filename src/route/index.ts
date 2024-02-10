import { Router } from 'express'
import * as auth from '../controller/authController'
import * as user from '../controller/user'
const router = Router();

router.post('/api/auth/login', auth.login)

router.post('/api/users', user.create)