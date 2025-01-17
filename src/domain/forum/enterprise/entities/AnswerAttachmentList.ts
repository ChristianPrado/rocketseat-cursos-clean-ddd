import { WatchedList } from "@/core/entities/WatchedList";
import { AnswerAttachment } from "./AnswerAttachment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId);
  }
}
