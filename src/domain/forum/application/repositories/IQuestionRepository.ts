import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { Question } from "../../enterprise/entities/Question";

export interface IQuestionRepository {
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  findManyRecent(params: IPaginationParams): Promise<Question[]>;
  save(question: Question): Promise<void>;
}
