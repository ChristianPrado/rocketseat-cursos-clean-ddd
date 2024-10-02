import { makeQuestion } from "tests/factories/makeQuestion";
import { InMemoryQuestionAttachmentRepository } from "tests/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "tests/repositories/InMemoryQuestionRepository";
import { Slug } from "../../enterprise/entities/valueObjects/Slug";
import { GetQuestionBySlugUseCase } from "./GetQuestionBySlugUseCase";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get questions by slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("question-slug"),
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "question-slug",
    });

    expect(result.isRight()).toBeTruthy();
  });
});
