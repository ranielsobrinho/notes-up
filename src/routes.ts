import { Router } from 'express'

import { UserController, NoteController } from './controllers/'
import { userSchema, noteSchema } from './utils/validations'
import validate from './middlewares/validationMiddleware'

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getOneUser)
routes.post('/users', validate(userSchema), UserController.createUser)
routes.put('/users/:id', validate(userSchema), UserController.updateUser)
routes.delete('/users/:id', UserController.deleteUser)

routes.get('/notes', NoteController.getNotes)
routes.post('/notes', validate(noteSchema) ,NoteController.createNote)
routes.put('/notes/:id', validate(noteSchema) ,NoteController.updateNote)
routes.delete('/notes/:id', NoteController.deleteTodo)

export default routes