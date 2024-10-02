import { IUseCaseError } from "@/core/errors/IUseCaseError";

export class NotAllowedError extends Error implements IUseCaseError {
  constructor() {
    super("Not allowed");
  }
}
