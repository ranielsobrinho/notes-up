import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ResponseStatus, IResponse } from "../utils/service";
import { User } from '../domain/entity'
import { ValidationError } from "yup";

class UserController {
    async getUsers (req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const userRepository = getRepository(User)
            const allUsers = await userRepository.find()
            return res.json({
                status: ResponseStatus.OK,
                data: allUsers
            })
        }catch(error){
            if( error instanceof ValidationError ){
                return res.json({
                    status: ResponseStatus.BAD_REQUEST,
                    errors: error.errors
                })
            }
            return res.json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
        
    }
}