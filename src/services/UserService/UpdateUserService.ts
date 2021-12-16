import { getRepository } from 'typeorm'
import { User } from '../../domain/entity'

class UpdateUserService {
  async handle(id: string, username: string) {
    const repo = getRepository(User)
    if (!await repo.findOne(id)) {
      return new Error('This user does not exists.')
    }
    const updated = repo.update(id, { username })
    return updated
  }
}

export default new UpdateUserService()