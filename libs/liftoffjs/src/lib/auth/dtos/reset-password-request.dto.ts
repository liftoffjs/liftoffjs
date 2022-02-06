export class ResetPasswordRequestDto {
  readonly username: string;

  constructor(data?: Partial<ResetPasswordRequestDto>) {
    Object.assign(this, data ?? {});
  }
}
