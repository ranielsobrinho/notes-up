import { Request, Response } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import { ValidationError } from "yup";
import CreateNoteService from "../../services/NoteService/CreateNoteService";

class CreateNote {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { content, userId } = req.body
      const createdNote = await CreateNoteService.handle({ content, userId })
      if (createdNote instanceof Error) {
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: createdNote.message
        })
      }
      return res.json({
        status: ResponseStatus.OK,
        data: createdNote
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

export default new CreateNote()