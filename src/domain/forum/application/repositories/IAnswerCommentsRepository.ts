import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { AnswerComment } from "../../enterprise/entities/AnswerComment";

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>;
  delete(answerComment: AnswerComment): Promise<void>;
}
