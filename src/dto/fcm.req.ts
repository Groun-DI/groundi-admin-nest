import { IsString } from 'class-validator';

export class FcmReq {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly token: string;
}
