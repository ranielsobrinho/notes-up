import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Note } from "../domain/entity"
import { ValidationError } from "yup"
import { IResponse, ResponseStatus } from "../utils/service"

class NoteController{
    async getNotes(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const noteRepository = getRepository(Note)
            const notes = await noteRepository.find({
                relations: ['userId'],
                select: ['id', 'content', 'userId']
            })
            return res.json({
                status: ResponseStatus.OK,
                data: notes
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

    async getNote(req: Request, res: Response<IResponse>,): Promise<Response<IResponse>> {
        try {
            const noteRepository = getRepository(Note)
            const { id } = req.params
            const note = await noteRepository.find({ where: { id } })
            if (!note.length) {
                return res.status(404).json({
                    status: ResponseStatus.NOT_FOUND,
                    message: 'This note does not exist.'
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

    async createNote(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const {userId} = req.body
            const noteRepository = getRepository(Note)
            const findUser = await noteRepository.findOne(userId)
            if(!findUser){
                return res.status(401).json({
                    status: ResponseStatus.UNAUTHORIZED,
                    message: 'This user does not exist.'
                })
            }
            const createdNote = noteRepository.create(req.body)
            await noteRepository.save(createdNote)

            return res.json({
                status: ResponseStatus.OK,
                data: createdNote
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

    async updateNote(req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const noteRepository = getRepository(Note)
            const updateNote = await noteRepository.update(id, req.body)
            
            return res.json({
                status: ResponseStatus.OK,
                message: 'Note updated successfully.'
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
    
    async deleteTodo (req: Request, res: Response<IResponse>): Promise<Response<IResponse>> {
        try{
            const { id } = req.params
            const noteRepository = getRepository(Note)
            const findNote = await noteRepository.findOne(id)
            if(!findNote){
                return res.status(404).json({
                    status: ResponseStatus.NOT_FOUND,
                    message: 'This note does not exist.'
                })
            }

            const deletedNote = await noteRepository.delete(id)
            return res.json({
                status: ResponseStatus.OK,
                message: 'Note deleted successfully.'
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