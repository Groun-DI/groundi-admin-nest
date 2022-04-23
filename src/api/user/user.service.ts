import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PlaceAdmin as PlaceAdminModel } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getMember(id: number | bigint): Promise<PlaceAdminModel> {
    const member = await this.prismaService.placeAdmin.findUnique({
      where: { id: id },
    });

    return member;
  }
}
