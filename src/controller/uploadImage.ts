import { Request, Response, NextFunction } from "express"
import { HttpStatusCode } from "../helper/CustomError"

const imageUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file as Express.MulterS3.File
        if (!file) throw new Error('Unable upload image, please try again')

        res.status(HttpStatusCode.CREATED).json({
            file: {
                url: file.location
            }
        })
    }
    catch (e) {
        next(e)
    }
}

export {
    imageUpload
}