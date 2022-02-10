import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly token: string;

  constructor(data?: Partial<ResetPasswordDto>) {
    Object.assign(this, data ?? {});
  }
}
