import { getRepository } from 'typeorm'
import { User } from '../domain/entity/User'

class UserService {
  async getAll(){
    const repo = getRepository(User)
    const users = await repo.find()
    return users
  }

  async getOne(id: string){
    const repo = getRepository(User)
    if(!await repo.findOne(id)){
      return new Error('User does not exists.')
    }
    const user = await repo.findOne(id, {
      relations: ['notes']
    })
    return user
  }
}

export default new UserService()