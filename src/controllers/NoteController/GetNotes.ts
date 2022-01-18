import { Request, Response } from "express";
import { ResponseStatus, IResponse } from "../../utils/service";
import { ValidationError } from "yup";
import GetNoteService from "../../services/NoteService/GetNoteService";

class GetNotes {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const allNotes = await GetNoteService.handle()
      return res.json({
        status: ResponseStatus.OK,
        data: allNotes
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

export default new GetNotes()