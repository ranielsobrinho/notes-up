import { Request, Response } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import { ValidationError } from "yup";
import UpdateNoteService from "../../services/NoteService/UpdateNoteService";

class UpdateNote {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { id } = req.params
      const { content } = req.body
      const updatedNote = await UpdateNoteService.handle({ id, content })
      if (updatedNote instanceof Error) {
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: updatedNote.message
        })
      }
      return res.json({
        status: ResponseStatus.OK,
        data: updatedNote
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

export default new UpdateNote()