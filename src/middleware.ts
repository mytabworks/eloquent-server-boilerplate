import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export default class Middleware {
    public static setResponseLocalsURL(request: Request, response: Response, next: any) {
        response.locals.url = request.protocol + '://' + request.headers.host + request.url;
        next();
    }

    public static serverErrorChecker(err: any, request: Request, response: Response, next: any) {
        if (!err) return next();
    
        console.error(err.stack);
    
        response.status(500).render('500', {
            error: err.stack
        });
    }

    public static async setAuthToken(request: Request, response: Response, next: any) {
        const auth = request.headers.authorization

        if(auth && auth.startsWith('Bearer ')) {

            try {
                const token = auth.split('Bearer ')[1]

                response.locals.payload = await verify(token, process.env.ACCESS_TOKEN_SECRET!)
            
            } catch (error) {

                response.status(401).send({
                    status: "error",
                    message: error.message
                })
            }
        }
        
        next();
    }

    public static pathNotFound(request: Request, response: Response) {
        response.status(404).send({
            status: "error",
            url: request.originalUrl,
            message: "Not Found"
        });
    }
}