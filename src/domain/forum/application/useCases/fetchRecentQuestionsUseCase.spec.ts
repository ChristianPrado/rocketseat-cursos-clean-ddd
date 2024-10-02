import { makeQuestion } from "tests/factories/makeQuestion";
import { InMemoryQuestionAttachmentRepository } from "tests/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "tests/repositories/InMemoryQuestionRepository";
import { FetchRecentQuestionsUseCase } from "./FetchRecentQuestionsUseCase";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch recent questions", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date("2022-01-20") }),
    );
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date("2022-01-18") }),
    );
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date("2022-01-23") }),
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date("2022-01-23") }),
      expect.objectContaining({ createdAt: new Date("2022-01-20") }),
      expect.objectContaining({ createdAt: new Date("2022-01-18") }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.questions).toHaveLength(2);
  });
});
