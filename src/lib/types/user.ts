import { Prisma } from '@prisma/client'

type IUser = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        userName: true,
        password: true,
        role: true,
        email: true,
        phoneNumber: true
    }
}>

export {
    IUser
}