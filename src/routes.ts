import { Router } from 'express'
import { UserController, NoteController } from './controllers/'

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getOneUser)
routes.post('/users', UserController.createUser)
routes.put('/users/:id', UserController.updateUser)
routes.delete('/users/:id', UserController.deleteUser)

routes.get('/notes', NoteController.getNotes)
routes.post('/notes', NoteController.createNote)
routes.put('/notes/:id', NoteController.updateNote)

export default routes