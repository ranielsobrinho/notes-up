import { Request, Response, NextFunction } from "express";
import * as jwt from 'jwt-simple'

export default function authenticate(req: Request, res: Response, next: NextFunction){
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.decode(token, '0187263r')
        if(decoded){
            next()
        }
    }catch(error){
        return res.status(400).json(error)
    }
}