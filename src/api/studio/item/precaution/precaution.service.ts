import { Injectable } from '@nestjs/common';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreatePrecautionDto } from './dto/create-precaution.dto';
import { UpdatePrecautionDto } from './dto/update-precaution.dto';

@Injectable()
export class PrecautionService {
  constructor(private readonly prismaService: PrismaService) { }
  create(createPrecautionDto: CreatePrecautionDto) {
    return 'This action adds a new precaution';
  }

  async findAll() {
    const complimentaries = await this.prismaService.complimentaryList.findMany();
    if (!complimentaries) throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
    return complimentaries;
  }

  findOne(id: number) {
    return `This action returns a #${id} precaution`;
  }

  update(id: number, updatePrecautionDto: UpdatePrecautionDto) {
    return `This action updates a #${id} precaution`;
  }

  remove(id: number) {
    return `This action removes a #${id} precaution`;
  }
}
