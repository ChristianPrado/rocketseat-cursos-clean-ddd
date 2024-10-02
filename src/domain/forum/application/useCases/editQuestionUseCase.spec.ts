import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeQuestion } from "tests/factories/makeQuestion";
import { makeQuestionAttachment } from "tests/factories/makeQuestionAttachment";
import { InMemoryQuestionAttachmentRepository } from "tests/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "tests/repositories/InMemoryQuestionRepository";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { EditQuestionUseCase } from "./EditQuestionUseCase";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    );
    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionAttachmentRepository,
    );
  });

  it("should be able to edit a question by id", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("2"),
      }),
    );

    await sut.execute({
      questionId: "question-1",
      authorId: "author-1",
      title: "new title",
      content: "new content",
      attachmentsIds: ["1", "3"],
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: "new title",
      content: "new content",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: "question-1",
      authorId: "author-2",
      title: "new title",
      content: "new content",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
