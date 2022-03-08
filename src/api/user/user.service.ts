import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PlaceAdmin as PlaceAdminModel } from '@prisma/client';
import {
  UNAUTHORIZED_TYPE,
  UnauthorizedException,
} from '../../errors/unauthorized.exception';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getMember(id: number | bigint): Promise<PlaceAdminModel> {
    (BigInt.prototype as any).toJSON = function () {
      return parseInt(this.toString());
    };

    const member = await this.prismaService.placeAdmin.findUnique({
      where: { id: id },
    });
    if (!member) throw new UnauthorizedException(UNAUTHORIZED_TYPE.NO_MEMBER);

    return member;
  }
}
