import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserReq {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly birthday: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class AuthNumberDto {
  @IsString()
  readonly phoneNumber: string;
}
