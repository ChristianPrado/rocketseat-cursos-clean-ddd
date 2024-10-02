import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  private value: string;

  constructor(value?: string) {
    this.value = value || randomUUID();
  }

  public equals(id: UniqueEntityID): boolean {
    return id.toValue() === this.value;
  }

  public toString() {
    return this.value;
  }

  public toValue() {
    return this.value;
  }
}
