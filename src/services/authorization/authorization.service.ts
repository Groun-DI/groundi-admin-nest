import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtModel } from '../../auth-guard/jwt/jwt.auth-guard';
import { ConfigService } from '@nestjs/config';
import { TokenRes } from '../../dto/token.res';

@Injectable()
export class AuthorizationService {
  aTokenExp: string;
  aTokenSecret: string;
  rTokenExp: string;
  rTokenSecret: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.aTokenExp = this.configService.get<string>('ACCESS_TOKEN_EXPIRE');
    this.aTokenSecret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
    this.rTokenExp = this.configService.get<string>('REFRESH_TOKEN_EXPIRE');
    this.rTokenSecret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
  }

  login(userId: number, email: string, phone: string): TokenRes {
    const payload: JwtModel = {
      userId: userId,
      email: email,
      phoneNumber: phone,
    };

    return {
      accessToken: this.jwtService.sign(
        payload,
        this.getTokenOptions(this.aTokenExp, this.aTokenSecret),
      ),
      refreshToken: this.jwtService.sign(
        payload,
        this.getTokenOptions(this.rTokenExp, this.rTokenSecret),
      ),
    };
  }

  private getTokenOptions = (exp, secret): JwtSignOptions => ({
    expiresIn: exp,
    secret: secret,
  });
}
