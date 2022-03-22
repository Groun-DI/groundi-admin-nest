import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ForbiddenException, FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RefundCode as RefundCodeModel } from '@prisma/client';

@Injectable()
export class RefundCodeService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll():Promise<RefundCodeModel[]> {
    const data = await this.prismaService.refundCode.findMany();
    if (!data) throw new UnauthorizedException(UNAUTHORIZED_TYPE.NO_MEMBER);

    return data;
  }

}
