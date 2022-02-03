import { IsEmail, IsString } from 'class-validator';

export class LoginReq {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
