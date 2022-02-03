// authorization-guard/local-authorization-guard.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export interface JwtModel {
  phoneNumber: string;
  email: string;
  adminId: number | bigint;
}
