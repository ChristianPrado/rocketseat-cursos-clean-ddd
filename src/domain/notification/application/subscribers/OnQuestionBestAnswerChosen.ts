import { DomainEvents } from "@/core/events/DomainEvents";
import { IEventHandler } from "@/core/events/IEventHandle";
import { IAnswerRepository } from "@/domain/forum/application/repositories/IAnswerRepository";
import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/entities/events/QuestionBestAnswerChosenEvent";
import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";

export class OnQuestionBestAnswerChosen implements IEventHandler {
  constructor(
    private answerRepository: IAnswerRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    );
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(
      bestAnswerId.toString(),
    );

    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat("..")}" foi escolhida pelo autor!`,
      });
    }
  }
}
