import { Request, Response, NextFunction } from "express";
import * as jwt from 'jwt-simple'

class AuthMiddleware {
    async auth(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decodedToken:string = await jwt.decode(token, process.env.TOKEN)
            if(decodedToken) {
                return next()
            }
            return res.status(401).json({message: 'You are not allowed to do this.'})
        } catch (error) {
            return res.json(error)
        }
    }
}

export default new AuthMiddleware()