import { getRepository } from 'typeorm'
import { User } from '../../domain/entity'

class GetAllUsers {
  async handle() {
    const repo = getRepository(User)
    const users = await repo.find()
    return users
  }
}

export default new GetAllUsers()