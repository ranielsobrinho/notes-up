import { getRepository } from 'typeorm'
import { User } from '../../domain/entity'

class GetOneUser {
  async handle(id: string) {
    const repo = getRepository(User)
    if (!await repo.findOne(id)) {
      return new Error('User does not exists.')
    }
    const user = await repo.findOne(id, {
      relations: ['notes']
    })
    return user
  }
}

export default new GetOneUser()