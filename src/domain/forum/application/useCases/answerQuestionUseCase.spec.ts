import { InMemoryAnswerAttachmentRepository } from "tests/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerRepository } from "tests/repositories/InMemoryAnswerRepository";
import { AnswerQuestionUseCase } from "./AnswerQuestionUseCase";

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryQuestionRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new AnswerQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to create a answer", async () => {
    const result = await sut.execute({
      content: "Question content",
      instructorId: "1",
      questionId: "1",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.answer);
  });
});
