import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeAnswer } from "tests/factories/makeAnswer";
import { makeQuestion } from "tests/factories/makeQuestion";
import { InMemoryAnswerAttachmentRepository } from "tests/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerRepository } from "tests/repositories/InMemoryAnswerRepository";
import { InMemoryQuestionAttachmentRepository } from "tests/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "tests/repositories/InMemoryQuestionRepository";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { ChooseQuestionBestAnswerUseCase } from "./ChooseQuestionBestAnswerUseCase";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose question best answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();

    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    );
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    );
  });

  it("should be able to choose the question best answer ", async () => {
    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toValue(),
      authorId: question.authorId.toValue(),
    });

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
