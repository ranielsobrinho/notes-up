import { Request, Response } from 'express'
import { ResponseStatus, IResponse } from "../../utils/service";
import { ValidationError } from "yup";
import GetOneUser from '../../services/UserService/GetOneUserService';

class GetUser {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { id } = req.params
      const user = await GetOneUser.handle(id)

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
}

export default new GetUser()