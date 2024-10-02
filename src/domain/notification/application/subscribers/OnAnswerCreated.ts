import { DomainEvents } from "@/core/events/DomainEvents";
import { IEventHandler } from "@/core/events/IEventHandle";
import { IQuestionRepository } from "@/domain/forum/application/repositories/IQuestionRepository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/entities/events/AnswerCreatedEvent";
import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";

export class OnAnswerCreated implements IEventHandler {
  constructor(
    private questionsRepository: IQuestionRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (question) {
      await this.sendNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 30)}..."`,
        content: answer.excerpt,
      });
    }
  }
}
