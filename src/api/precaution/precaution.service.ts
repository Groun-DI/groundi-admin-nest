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
    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };
    
    const precautions = await this.prismaService.precautionList.findMany();
    if (!precautions) throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);

    
    return precautions;
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
