export class RegisterUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;

  constructor(data?: Partial<RegisterUserDto>) {
    Object.assign(this, data ?? {});
  }
}