import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CenterAdmins as CenterAdminsModel } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getMember(id: number | bigint): Promise<CenterAdminsModel> {
    const member = await this.prismaService.centerAdmins.findUnique({
      where: { id: id },
    });

    return member;
  }
}
