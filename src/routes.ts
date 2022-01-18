import { Router } from 'express'

import { NoteController, AuthController } from './controllers/'
import { userSchema, noteSchema } from './utils/validations'
import { validate, AuthMiddleware } from './middlewares/'
import { GetUsers, GetUser, CreateUser, UpdateUser, DeleteUser } from './controllers/UserController/'
import { CreateNote, DeleteNote, GetNote, GetNotes, UpdateNote } from './controllers/NoteController'

const routes = Router()

routes.get('/users', GetUsers.execute)
routes.get('/users/:id', GetUser.execute)
routes.post('/users', validate(userSchema), CreateUser.execute)
routes.put('/users/:id', validate(userSchema), AuthMiddleware.auth, UpdateUser.execute)
routes.delete('/users/:id', AuthMiddleware.auth, DeleteUser.execute)

routes.get('/notes', GetNotes.execute)
routes.get('/notes/:id', GetNote.execute)
routes.post('/notes', validate(noteSchema), CreateNote.execute)
routes.put('/notes/:id', UpdateNote.execute)
routes.delete('/notes/:id', DeleteNote.execute)

routes.post('/auth', validate(userSchema), AuthController.authenticate)

export default routes
