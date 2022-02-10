import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @Transform((x) => (<string>x.value)?.toLocaleLowerCase()?.trim())
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform((x) => (<string>x.value)?.toLocaleLowerCase()?.trim())
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  constructor(data?: Partial<RegisterUserDto>) {
    Object.assign(this, data ?? {});
  }
}
