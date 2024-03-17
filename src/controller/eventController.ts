import { NextFunction, Request, Response } from 'express'
import { eventCreateParams } from '../lib/validation/event'
import { APIError, HttpStatusCode } from '../helper/CustomError'
import prisma from '../model/event'
import { handleError } from '../helper/errorHandler'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req)
    const eventCreateRequest = eventCreateParams.safeParse(req.body)
    if (!eventCreateRequest.success) throw new APIError('Invalid request body', HttpStatusCode.BAD_REQUEST)
    if (!req.user) throw new APIError('Unauthorized', HttpStatusCode.UNAUTHORISED)

    const eventDetails = eventCreateRequest.data.event
    const event = await prisma.event.add({ ...eventDetails, addedBy: req.user.id })

    return res.status(HttpStatusCode.CREATED).json({
      event
    })
  }
  catch (e) {
    next(e)
  }
}

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.list()
    return res.status(HttpStatusCode.OK).json({ events })
  }
  catch (e) {
    next(e)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = parseInt(req.params.id)
    if (!req.user) throw new APIError('User not found', HttpStatusCode.UNAUTHORISED)

    const eventRegistration = await prisma.eventUser.create({
      data: {
        eventId, userId: req.user.id
      }
    })

    res.status(HttpStatusCode.CREATED).json({
      eventRegistration
    })
  }
  catch (e) {
    next(e)
  }
}

export {
  create,
  index,
  register
}