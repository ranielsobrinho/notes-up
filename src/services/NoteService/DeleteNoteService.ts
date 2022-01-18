import { getRepository } from "typeorm";
import { Note } from "../../domain/entity";

class DeleteNoteService {
  async handle(id: string) {
    const repo = getRepository(Note)
    if (! await repo.findOne(id)) {
      return new Error('This note does not exists.')
    }
    await repo.delete(id)
    return
  }
}

export default new DeleteNoteService()