import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ResponseStatus, IResponse } from "../utils/service";
import { User } from '../domain/entity'
import { ValidationError } from "yup";
import * as bcrypt from 'bcrypt'
import UserService from "../services/UserService";

class UserController {
    async getUsers(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try {
            const allUsers = await UserService.getAll()
            return res.json({
                status: ResponseStatus.OK,
                data: allUsers
            })
        } catch (error) {
            if (error instanceof ValidationError) {
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

    async getOneUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try {
            const { id } = req.params
            const user = await UserService.getOne(id)

            if (user instanceof Error) {
                return res.status(404).json({
                    status: ResponseStatus.NOT_FOUND,
                    message: user.message
                })
            }

            return res.json({
                status: ResponseStatus.OK,
                data: user
            })
        } catch (error) {
            if (error instanceof ValidationError) {
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

    async createUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try {
            const { username, password } = req.body
            const createdUser = await UserService.createUser({ username, password })

            if (createdUser instanceof Error) {
                return res.status(401).json({
                    status: ResponseStatus.UNAUTHORIZED,
                    message: createdUser.message
                })
            }

            return res.json({
                status: ResponseStatus.OK,
                data: createdUser
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    status: ResponseStatus.BAD_REQUEST,
                    errors: error.errors
                })
            }
            return res.status(500).json({
                status: ResponseStatus.INTERNAL_SERVER_ERROR,
                message: 'An internal server error has happened.',
                errors: error
            })
        }
    }

    async updateUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try {
            const { id } = req.params
            const { username } = req.body
            const update = await UserService.updateUsername(id, username)

            if (update instanceof Error) {
                return res.status(401).json({
                    status: ResponseStatus.UNAUTHORIZED,
                    message: update.message
                })
            }

            return res.json({
                status: ResponseStatus.OK,
                data: update,
                message: 'User data has been updated.'
            })
        } catch (error) {
            if (error instanceof ValidationError) {
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

    async updatePassword(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try {
            const { username, password } = req.body
            const update = await UserService.updatePassword({ username, password })
            if (update instanceof Error) {
                return res.status(400).json({
                    status: ResponseStatus.BAD_REQUEST,
                    message: update.message
                })
            }
            return res.json({
                status: ResponseStatus.OK,
                data: update
            })
        } catch (error) {
            if (error instanceof ValidationError) {
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

    async deleteUser(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try {
            const { id } = req.params
            const deletedUser = await UserService.deleteUser(id)

            if (deletedUser instanceof Error) {
                return res.status(401).json({
                    status: ResponseStatus.BAD_REQUEST,
                    message: deletedUser.message
                })
            }

            return res.json({
                status: ResponseStatus.OK,
                message: 'User data has been deleted.'
            })
        } catch (error) {
            if (error instanceof ValidationError) {
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

export default new UserController()