import { Injectable } from '@nestjs/common';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenityService {
  constructor(private readonly prismaService: PrismaService) { }
  create(createAmenityDto: CreateAmenityDto) {
    return 'This action adds a new amenity';
  }

  async findAll(): Promise<Amenity[]> {
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
