import { z } from 'zod'

const createUserParams = z.object({
    user: z.object({
        name: z.string(),
        userName: z.string(),
        password: z.string(),
        email: z.string(),
        phoneNumber: z.string()
    })
})

export {
    createUserParams
}