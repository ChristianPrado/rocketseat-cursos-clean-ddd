import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeQuestionComment } from "tests/factories/makeQuestionComment";
import { InMemoryQuestionCommentsRepository } from "tests/repositories/InMemoryQuestionCommentsRepository";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { DeleteQuestionCommentUseCase } from "./DeleteQuestionCommentUseCase";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Comment question comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      authorId: questionComment.authorId.toValue(),
      questionCommentId: questionComment.id.toValue(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    const result = await sut.execute({
      authorId: "author-2",
      questionCommentId: questionComment.id.toValue(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
