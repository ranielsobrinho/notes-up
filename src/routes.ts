import { Router } from 'express'

import { UserController, NoteController, AuthController } from './controllers/'
import { userSchema, noteSchema } from './utils/validations'
import { validate, AuthMiddleware } from './middlewares/'

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getOneUser)
routes.post('/users', validate(userSchema), UserController.createUser)
routes.put('/users/:id', validate(userSchema), AuthMiddleware.auth, UserController.updateUser)
routes.delete('/users/:id', AuthMiddleware.auth ,UserController.deleteUser)

routes.get('/notes', NoteController.getNotes)
routes.get('/notes/:id', NoteController.getNote)
routes.post('/notes', validate(noteSchema) , AuthMiddleware.auth, NoteController.createNote)
routes.put('/notes/:id', AuthMiddleware.auth , NoteController.updateNote)
routes.delete('/notes/:id', AuthMiddleware.auth ,NoteController.deleteTodo)

routes.post('/auth', validate(userSchema), AuthController.authenticate)

export default routes
