import { getRepository } from "typeorm";
import { Note } from "../../domain/entity";

class GetNote {
  async handle() {
    const repo = getRepository(Note)
    const notes = await repo.find({
      relations: ['userId']
    })
    return notes
  }
}

export default new GetNote()