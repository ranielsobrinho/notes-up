import { getRepository } from 'typeorm'
import { User } from '../../domain/entity'

class DeleteUserService {
  async handle(id: string) {
    const repo = getRepository(User)
    if (! await repo.findOne(id)) {
      return new Error('User does not exists.')
    }
    const deleted = await repo.delete(id)
    return deleted
  }
}

export default new DeleteUserService()