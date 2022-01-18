import { Request, Response } from "express";
import { IResponse, ResponseStatus } from "../../utils/service";
import { ValidationError } from "yup";
import GetOneNoteService from "../../services/NoteService/GetOneNoteService";

class GetNote {
  async execute(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
    try {
      const { id } = req.params
      const note = await GetOneNoteService.handle(id)

      if (note instanceof Error) {
        return res.status(404).json({
          status: ResponseStatus.NOT_FOUND,
          message: note.message
        })
      }

      return res.json({
        status: ResponseStatus.OK,
        data: note
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

export default new GetNote()