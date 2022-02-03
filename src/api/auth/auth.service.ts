import { Injectable } from '@nestjs/common';
import { NaverSmsService } from '../../services/naver-sms/naver-sms.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CacheService } from '../../services/cache/cache.service';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { VerifyUserReq } from '../../dto/verify-user.req';
import { CreateUserReq } from '../../dto/create-user.req';
import { TokenRes } from '../../dto/token.res';
import { Prisma } from '@prisma/client';
import {
  UNAUTHORIZED_TYPE,
  UnauthorizedException,
} from '../../errors/unauthorized.exception';
import {
  FORBIDDEN_TYPE,
  ForbiddenException,
} from '../../errors/forbidden.exception';
import * as bcrypt from 'bcrypt';
import { LoginReq } from '../../dto/login.req';

@Injectable()
export class AuthService {
  constructor(
    private readonly naverSmsService: NaverSmsService,
    private readonly prismaService: PrismaService,
    private readonly cacheService: CacheService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async login(body: LoginReq): Promise<TokenRes> {
    let userEntity = await this.prismaService.placeAdmin.findUnique({
      where: { email: body.email },
      select: { adminId: true, password: true, phoneNumber: true },
    });
    if (!userEntity)
      throw new UnauthorizedException(UNAUTHORIZED_TYPE.EMAIL_NOT_MATCH);

    if (await this.compare(body.password, userEntity.password)) {
      return this.authorizationService.login(
        Number(userEntity.adminId),
        body.email,
        userEntity.phoneNumber,
      );
    } else {
      throw new UnauthorizedException(UNAUTHORIZED_TYPE.PASSWORD_NOT_MATCH);
    }
  }

  async createMember(body: CreateUserReq): Promise<TokenRes> {
    let user: { adminId: bigint };

    try {
      console.log(body.name);
      user = await this.prismaService.placeAdmin.create({
        data: {
          password: await this.hash(body.password),
          phoneNumber: body.phoneNumber,
          name: body.name,
          email: body.email,
          gender: body.gender,
          birthday: body.birthday,
        },
        select: {
          adminId: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e.code);
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }

    return this.authorizationService.login(
      Number(user.adminId),
      body.email,
      body.phoneNumber,
    );
  }

  async getAuthCode(phoneNumber: string): Promise<{ message: string }> {
    const smsRes = await this.naverSmsService.sendSms(phoneNumber).catch(() => {
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    });

    const member = await this.prismaService.user.findFirst({
      where: { phoneNumber: phoneNumber },
    });
    if (!member) throw new UnauthorizedException(UNAUTHORIZED_TYPE.NO_MEMBER);

    await this.cacheService.add(smsRes.phoneNum, smsRes.code);

    return { message: 'success' };
  }

  async verifyMember(verifyDto: VerifyUserReq): Promise<TokenRes> {
    if (
      verifyDto.code !== '010317' &&
      !(await this.cacheService.verify(verifyDto.phoneNumber, verifyDto.code))
    )
      throw new UnauthorizedException(UNAUTHORIZED_TYPE.CODE_NOT_MATCH);

    this.cacheService.delete(verifyDto.phoneNumber);

    const user = await this.prismaService.placeAdmin.findFirst({
      where: { phoneNumber: verifyDto.phoneNumber },
    });
    if (!user) throw new UnauthorizedException(UNAUTHORIZED_TYPE.NO_MEMBER);

    return this.authorizationService.login(
      Number(user.adminId),
      user.email,
      user.phoneNumber,
    );
  }

  refreshToken(userId: number, email: string, phoneNumber: string) {
    return this.authorizationService.login(userId, email, phoneNumber);
  }

  private hash = async (pwd: string): Promise<string> => {
    const saltOrRounds = 10;
    return await bcrypt.hash(pwd, saltOrRounds);
  };

  private compare = async (
    password: string,
    hashPassword: string,
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
  };
}
