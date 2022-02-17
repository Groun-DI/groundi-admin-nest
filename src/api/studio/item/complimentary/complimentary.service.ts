import { Injectable } from '@nestjs/common';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateComplimentaryDto } from './dto/create-complimentary.dto';
import { UpdateComplimentaryDto } from './dto/update-complimentary.dto';

@Injectable()
export class ComplimentaryService {
  constructor(private readonly prismaService: PrismaService) { }
  create(createComplimentaryDto: CreateComplimentaryDto) {
    return 'This action adds a new complimentary';
  }

  async findAll() {
    const complimentaries = await this.prismaService.complimentaryList.findMany();
    if (!complimentaries) throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
    return complimentaries;
  }

  findOne(id: number) {
    return `This action returns a #${id} complimentary`;
  }

  update(id: number, updateComplimentaryDto: UpdateComplimentaryDto) {
    return `This action updates a #${id} complimentary`;
  }

  remove(id: number) {
    return `This action removes a #${id} complimentary`;
  }
}
