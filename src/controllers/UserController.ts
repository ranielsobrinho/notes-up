import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ResponseStatus, IResponse } from "../utils/service";
import { User } from '../domain/entity'
import { ValidationError } from "yup";
import * as bcrypt from 'bcrypt'

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
                return res.status(400).json({
                    status: ResponseStatus.BAD_REQUEST,
                    errors: error.errors
                })
            }
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
        
    }

    async getOneUser (req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const userRepository = getRepository(User)
            const user = await userRepository.findOne(id, {
                relations: ['notes'],
                select: ['username', 'notes', 'id']
            })

            if(!user) {
                return res.status(404).json({
                    status: ResponseStatus.NOT_FOUND,
                    message: 'No user has been found.'
                })
            }

            return res.json({
                status: ResponseStatus.OK,
                data: user
            })
        } catch(error) {
            if ( error instanceof ValidationError ) {
                return res.status(400).json({
                    status: ResponseStatus.BAD_REQUEST,
                    errors: error.errors
                })
            }
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
    }

    async createUser (req: Request, res: Response<IResponse>): Promise<Response<IResponse>>{
        try{
            const userRepository = getRepository(User)
            const { username } = req.body
            const findUser = await userRepository.findOne( { where: { username } } )

            if(findUser){
                return res.status(401).json({
                    status: ResponseStatus.UNAUTHORIZED,
                    message: 'User already exists.'
                })
            }

            const salt = bcrypt.genSaltSync(10)
            const password = bcrypt.hashSync(req.body.password, salt)

            const createdUser = userRepository.create({username, password})
            await userRepository.save(createdUser)
        } catch(error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
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

    async updateUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const userRepository = getRepository(User)
            const findUser = await userRepository.findOne(id)

            if(!findUser) {
                return res.status(401).json({
                    status: ResponseStatus.UNAUTHORIZED,
                    message: 'No user has been found. You need an existing account to update.'
                })
            }
            
            const update = await userRepository.update(id, req.body)
            return res.json({
                status: ResponseStatus.OK,
                message: 'User data has been updated.'
            })
        }catch(error) {
            if(error instanceof ValidationError){
                return res.status(400).json({
                    status: ResponseStatus.BAD_REQUEST,
                    errors: error.errors
                })
            }
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
    }

    async deleteUser (req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const userRepository = getRepository(User)
            const findUser = await userRepository.findOne(id)

            if(!findUser){
                return res.status(401).json({
                    status: ResponseStatus.BAD_REQUEST,
                    message: 'No user has been found. You need an existing account to delete.'
                })
            }

            const deletedUser = await userRepository.delete(id)
            return res.json({
                status: ResponseStatus.OK,
                message: 'User data has been deleted.'
            })
        }catch(error){
            if (error instanceof ValidationError){
                return res.status(400).json({
                    status: ResponseStatus.BAD_REQUEST,
                    errors: error.errors
                })
            }
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.'
            })
        }
    }
}