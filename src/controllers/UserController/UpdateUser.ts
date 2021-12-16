import { Request, Response } from "express";
import { ResponseStatus, IResponse } from "../../utils/service";
import { ValidationError } from "yup";
import UpdateUserService from "../../services/UserService/UpdateUserService";

class UpdateUser {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { id } = req.params
      const { username } = req.body
      const update = await UpdateUserService.handle(id, username)

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
}

export default new UpdateUser()