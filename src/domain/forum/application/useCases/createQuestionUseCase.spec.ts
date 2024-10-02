import { InMemoryQuestionAttachmentRepository } from "tests/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "tests/repositories/InMemoryQuestionRepository";
import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: CreateQuestionUseCase;

describe("Create questions", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    );
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      content: "Question content",
      authorId: "1",
      title: "Question title",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBeTruthy();
  });
});
