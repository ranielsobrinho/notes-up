import { getRepository } from "typeorm";
import { Note } from "../../domain/entity";

interface NoteRequest {
  id: string,
  content: string
}

class UpdateNoteService {
  async handle({ id, content }: NoteRequest) {
    const repo = getRepository(Note)
    if (! await repo.findOne(id)) {
      return new Error('This note does not exists.')
    }
    const updated = repo.update(id, { content })
    return updated
  }
}

export default new UpdateNoteService()