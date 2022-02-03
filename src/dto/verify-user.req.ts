import { IsString } from 'class-validator';

export class VerifyUserReq {
  @IsString()
  readonly phoneNumber: string;

  @IsString()
  readonly code: string;
}
