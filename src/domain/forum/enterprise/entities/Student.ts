import { Entity } from "@/core/entities/Entity";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";

interface IStudentProps {
  name: string;
}

export class Student extends Entity<IStudentProps> {
  static create(props: IStudentProps, id?: UniqueEntityID) {
    return new Student(
      {
        ...props,
      },
      id,
    );
  }
}
