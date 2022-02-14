import { Injectable } from '@nestjs/common';
import { AuthorizationService } from 'src/services/authorization/authorization.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { Prisma } from '@prisma/client';
import {
  UNAUTHORIZED_TYPE,
  UnauthorizedException,
} from '../../errors/unauthorized.exception';
import {
  FORBIDDEN_TYPE,
  ForbiddenException,
} from '../../errors/forbidden.exception';

@Injectable()
export class CenterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authorizationService: AuthorizationService,
  ) { }

  async create(id: number | bigint, body: CreateCenterDto) {
    let center: { id: number | bigint };
    try {
      center = await this.prismaService.center.create({
        data: {
          adminId: id,
          name: body.name,
          address: body.address,
          phoneNumber: body.phoneNumber
        },
        select: {
          id: true
        }
      })
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
    return { message: "success" }
  }

  findAll() {
    return `This action returns all center`;
  }

  findOne(id: number) {
    return `This action returns a #${id} center`;
  }

  update(id: number, updateCenterDto: UpdateCenterDto) {
    return `This action updates a #${id} center`;
  }

  remove(id: number) {
    return `This action removes a #${id} center`;
  }
}