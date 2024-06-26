enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORISED = 401,
    UNPROCESSIBLE_ENTITY = 422,
    INTERNAL_SERVER = 500,
}

class BaseError extends Error {
    public readonly name: string
    public readonly httpCode: HttpStatusCode
    public readonly isOperational: boolean
    constructor(name: string, httpCode: HttpStatusCode, isOperational: boolean, description: string) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.httpCode = httpCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

class APIError extends BaseError {
    constructor(name: string, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, isOperational, description)
    }
}

export {
    APIError,
    HttpStatusCode
}
