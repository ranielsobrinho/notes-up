import { getRepository } from "typeorm";
import { Note, User } from "../../domain/entity";

interface NoteRequest {
  content: string,
  userId: User
}

class CreateNoteService {
  async handle({ content, userId }: NoteRequest): Promise<Note | Error> {
    const repo = getRepository(Note)
    if (! await repo.findOne(userId)) {
      return new Error('No user exists with this id.')
    }
    const note = repo.create({
      content,
      userId
    })
    await repo.save(note)
    return note
  }
}

export default new CreateNoteService()
