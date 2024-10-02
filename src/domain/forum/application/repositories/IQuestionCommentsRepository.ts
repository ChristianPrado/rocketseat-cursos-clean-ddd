import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { QuestionComment } from "../../enterprise/entities/QuestionComment";

export interface IQuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<QuestionComment[]>;
  delete(questionComment: QuestionComment): Promise<void>;
}
