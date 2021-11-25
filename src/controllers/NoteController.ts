import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Note } from "../domain/entity"
import { ValidationError } from "yup"
import { IResponse, ResponseStatus } from "../utils/service"

class NoteController{
    async getNotes(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const noteRepository = getRepository(Note)
            const notes = noteRepository.find()
            return res.json({
                status: ResponseStatus.OK,
                data: notes
            })
        }catch(error){
            if(error instanceof ValidationError){
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

export default new NoteController()