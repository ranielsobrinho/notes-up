import { Router } from 'express'

import { NoteController, AuthController } from './controllers/'
import { userSchema, noteSchema } from './utils/validations'
import { validate, AuthMiddleware } from './middlewares/'
import { GetUsers, GetUser, CreateUser, UpdateUser, DeleteUser } from './controllers/UserController/'

const routes = Router()

routes.get('/users', GetUsers.execute)
routes.get('/users/:id', GetUser.execute)
routes.post('/users', validate(userSchema), CreateUser.execute)
routes.put('/users/:id', validate(userSchema), AuthMiddleware.auth, UpdateUser.execute)
routes.delete('/users/:id', AuthMiddleware.auth, DeleteUser.execute)

routes.get('/notes', NoteController.getNotes)
routes.get('/notes/:id', NoteController.getNote)
routes.post('/notes', validate(noteSchema), NoteController.createNote)
routes.put('/notes/:id', NoteController.updateNote)
routes.delete('/notes/:id', NoteController.deleteTodo)

routes.post('/auth', validate(userSchema), AuthController.authenticate)

export default routes
