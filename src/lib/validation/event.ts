import { z } from 'zod'

const eventCreateParams = z.object({
    event: z.object({
        title: z.string(),
        description: z.string(),
        eventTiming: z.string(),
        location: z.string(),
        prize: z.number(),
        posterUrl: z.string()
    })
})

export {
    eventCreateParams
}