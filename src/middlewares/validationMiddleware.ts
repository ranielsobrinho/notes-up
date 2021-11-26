import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

const validate = (schema) => async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        const success = await schema.validate(req.body)
        if(!success){
            return res.json({ message: 'There is some empty required field.' })
        }
        next()
    }catch(error){
        return res.json(error)
    }
}

export default validate