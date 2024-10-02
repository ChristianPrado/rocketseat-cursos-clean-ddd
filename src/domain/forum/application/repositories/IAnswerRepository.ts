import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { Answer } from "../../enterprise/entities/Answer";

export interface IAnswerRepository {
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]>;
  save(answer: Answer): Promise<void>;
}
