import { getRepository } from 'typeorm'
import { User } from '../../domain/entity'
import * as bcrypt from 'bcrypt'

interface UserRequest {
  username: string
  password: string
}

class CreateUserService {
  async handle({ username, password }: UserRequest): Promise<User | Error> {
    const repo = getRepository(User)
    if (await repo.findOne({ username })) {
      return new Error('User already exists. Choose another username.')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    const user = repo.create({
      username,
      password: hashPassword
    })
    await repo.save(user)
    return user
  }
}

export default new CreateUserService()