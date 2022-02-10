import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @Transform(x => (<string>x.value)?.toLocaleLowerCase()?.trim())
  readonly usernameOrEmail: string;

  @IsNotEmpty()
  readonly password: string;

  constructor(data?: Partial<LoginUserDto>) {
    Object.assign(this, data ?? {});
  }
}
