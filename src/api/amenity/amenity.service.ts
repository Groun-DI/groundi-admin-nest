import { Injectable } from '@nestjs/common';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { AmenityRes } from './dto/amenity.res';
import { Prisma } from '@prisma/client';
import { ForbiddenException, FORBIDDEN_TYPE } from 'src/errors/http-exceptions';

@Injectable()
export class AmenityService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(body: CreateAmenityDto) {
    return `This action returns  amenity`;
  }

  async findAll(): Promise<AmenityRes[]> {
    const amenity = await this.prismaService.amenityList.findMany();
    if (!amenity) throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
    return amenity;
  }

  findOne(id: number) {
    return `This action returns a #${id} amenity`;
  }

  update(id: number, updateAmenityDto: UpdateAmenityDto) {
    return `This action updates a #${id} amenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} amenity`;
  }
}
