import { getRepository } from "typeorm";
import { Note } from "../../domain/entity";

class GetOneNoteService {
  async handle(id: string) {
    const repo = getRepository(Note)
    if (! await repo.findOne(id)) {
      return new Error('Note does not exists.')
    }
    const notes = await repo.findOne(id, {
      relations: ['userId']
    })
    return notes
  }
}

export default new GetOneNoteService()