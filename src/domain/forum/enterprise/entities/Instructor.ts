import { Entity } from "@/core/entities/Entity";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";

interface IInstructorProps {
  name: string;
}

export class Instructor extends Entity<IInstructorProps> {
  static create(props: IInstructorProps, id?: UniqueEntityID) {
    return new Instructor(
      {
        ...props,
      },
      id,
    );
  }
}
