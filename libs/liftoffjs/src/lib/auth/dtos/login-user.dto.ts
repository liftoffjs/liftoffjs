export class LoginUserDto {
  readonly username: string;
  readonly password: string;

  constructor(data?: Partial<LoginUserDto>) {
    Object.assign(this, data ?? {});
  }
}
