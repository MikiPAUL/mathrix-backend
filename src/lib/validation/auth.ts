import { z } from "zod";

const loginParams = z.object({
    auth: z.object({
        userName: z.string(),
        password: z.string()
    })
})

export {
    loginParams
};