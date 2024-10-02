import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeAnswerComment } from "tests/factories/makeAnswerComment";
import { InMemoryAnswerCommentsRepository } from "tests/repositories/InMemoryAnswerCommentsRepository";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { DeleteAnswerCommentUseCase } from "./DeleteAnswerCommentUseCase";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Comment answer comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      authorId: answerComment.authorId.toValue(),
      answerCommentId: answerComment.id.toValue(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await sut.execute({
      authorId: "author-2",
      answerCommentId: answerComment.id.toValue(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
