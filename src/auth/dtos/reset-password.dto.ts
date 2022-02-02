export class ResetPasswordDto {
  readonly username: string;
  readonly password: string;
  readonly token: string;

  constructor(data?: Partial<ResetPasswordDto>) {
    Object.assign(this, data ?? {});
  }
}
