// Error
class Left<L, R> {
  constructor(public readonly value: L) {}

  public isRight(): this is Right<L, R> {
    return false;
  }

  public isLeft(): this is Left<L, R> {
    return true;
  }
}

// Success
class Right<L, R> {
  constructor(public readonly value: R) {}

  public isRight(): this is Right<L, R> {
    return true;
  }

  public isLeft(): this is Left<L, R> {
    return false;
  }
}

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};

export type Either<L, R> = Left<L, R> | Right<L, R>;
