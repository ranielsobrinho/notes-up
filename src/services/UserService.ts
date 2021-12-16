import { getRepository } from 'typeorm'
import { User } from '../domain/entity/User'
import * as bcrypt from 'bcrypt'

interface UserRequest {
  username: string
  password: string
}
class UserService {
  async getAll() {
    const repo = getRepository(User)
    const users = await repo.find()
    return users
  }

  async getOne(id: string) {
    const repo = getRepository(User)
    if (!await repo.findOne(id)) {
      return new Error('User does not exists.')
    }
    const user = await repo.findOne(id, {
      relations: ['notes']
    })
    return user
  }

  async createUser({ username, password }: UserRequest): Promise<User | Error> {
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

  async updateUsername(id: string, username: string) {
    const repo = getRepository(User)
    if (!await repo.findOne(id)) {
      return new Error('This user does not exists.')
    }
    const updated = repo.update(id, { username })
    return updated
  }

  async updatePassword({ username, password }: UserRequest) {
    const repo = getRepository(User)
    if (!await repo.findOne({ username })) {
      return new Error('There is no user with this username.')
    }
    const updated = await repo.update(username, { password })
    return updated
  }
}

export default new UserService()