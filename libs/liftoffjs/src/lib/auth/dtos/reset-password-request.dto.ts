import { IsNotEmpty } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  readonly usernameOrEmail: string;

  constructor(data?: Partial<ResetPasswordRequestDto>) {
    Object.assign(this, data ?? {});
  }
}
