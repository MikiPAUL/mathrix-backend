import { z } from "zod";

const authParams = z.object({
    auth: z.object({
        userName: z.string(),
        password: z.string()
    })
})

export {
    authParams
};