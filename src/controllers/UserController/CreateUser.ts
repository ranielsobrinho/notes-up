import { Request, Response } from "express";
import { ResponseStatus, IResponse } from "../../utils/service";
import { ValidationError } from "yup";
import CreateUserService from "../../services/UserService/CreateUserService";

class CreateUser {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { username, password } = req.body
      const createdUser = await CreateUserService.handle({ username, password })

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
}

export default new CreateUser()