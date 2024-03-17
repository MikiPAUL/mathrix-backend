import { Router } from 'express'
import * as auth from '../controller/authController'
import * as user from '../controller/userController'
import * as event from '../controller/eventController'
import { imageUpload } from '../controller/uploadImage'
import passport from 'passport'
import { checkIsInRole } from '../middleware/auth.middleware'
import { UserRole } from '@prisma/client'
import { handleError } from '../helper/errorHandler'
import uploadImageService from '../helper/uploadImage'

const router = Router()

//auth
router.post(
    '/api/auth/login',
    passport.authenticate("login", { session: false, failWithError: true }),
    auth.login,
    handleError('Unable to login')
)

router.post(
    '/api/auth/signup',
    auth.register,
    handleError('Unable to Register')
)

//upload Image 
router.post(
    '/api/image/upload',
    checkIsInRole(UserRole.Coordinator),
    uploadImageService.single('image'),
    imageUpload,
    handleError('Unable to upload image')
)


//events
router.post(
    '/api/events',
    passport.authenticate("jwt", { session: false, failWithError: true }),
    checkIsInRole(UserRole.Coordinator),
    event.create,
    handleError('Unable to create event')
)

router.get(
    '/api/events',
    // passport.authenticate("jwt", { session: false, failWithError: true }),
    // checkIsInRole(UserRole.Coordinator, UserRole.Participant),
    event.index,
    handleError('Unable to fetch events list')
)

router.post(
    '/api/events/:id',
    passport.authenticate("jwt", { session: false, failWithError: true }),
    checkIsInRole(UserRole.Participant),
    event.register,
    handleError('Unable to register')
)

//user
router.get(
    '/api/user/profile',
    passport.authenticate("jwt", { session: false, failWithError: true }),
    user.profile,
    handleError('Unable to fetch profile details')
)

export default router