import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ForbiddenException, FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateStudioDto } from './dto/create-precaution.dto';
import { UpdateStudioDto } from './dto/update-precaution.dto';

@Injectable()
export class StudioService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(body: CreateStudioDto) {
    let studio: { id: number | bigint };
    try {
      studio = await this.prismaService.studio.create({
        data: {
          centerId: body.centerId,
          name: body.name,
          content: body.content,
          basicOccupancy: body.basicOccupancy,
          maximumOccupancy: body.maximumOccupancy,
          overCharge: body.overCharge,
          lowestPrice: body.lowestPrice,
          highestPrice: body.highestPrice
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
    return Number(studio);
  }

  async findAll() {
    return `This action returns a precaution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} precaution`;
  }

  update(id: number, updateStudioDto: UpdateStudioDto) {
    return `This action updates a #${id} precaution`;
  }

  remove(id: number) {
    return `This action removes a #${id} precaution`;
  }
}
