import { Request, Response } from "express";
import { ResponseStatus, IResponse } from "../../utils/service";
import { ValidationError } from "yup";
import DeleteUserService from "../../services/UserService/DeleteUserService";

class DeleteUser {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { id } = req.params
      const deletedUser = await DeleteUserService.handle(id)

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

export default new DeleteUser()