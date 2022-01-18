import { Response, Request } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import { ValidationError } from "yup";
import DeleteNoteService from "../../services/NoteService/DeleteNoteService";

class DeleteNote {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { id } = req.params
      const deleted = await DeleteNoteService.handle(id)
      if (deleted instanceof Error) {
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: deleted.message
        })
      }
      return res.json({
        status: ResponseStatus.OK,
        message: 'Deleted successfully.'
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

export default new DeleteNote()