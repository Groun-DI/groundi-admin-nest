import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateStudioOpenStatusPerWeekDto } from './dto/create-studio-open-status-per-week.dto';
import { UpdateStudioOpenStatusPerWeekDto } from './dto/update-studio-open-status-per-week.dto';

@Injectable()
export class StudioOpenStatusPerWeekService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createStudioOpenStatusPerWeekDto: CreateStudioOpenStatusPerWeekDto) {
    let generatedId: { id: bigint };

    try {
      generatedId = await this.prismaService.studioOpenStatusPerWeek.create({
        data: {
          id: createStudioOpenStatusPerWeekDto.id,
          studioId: createStudioOpenStatusPerWeekDto.studioId,
          dayOfweek: createStudioOpenStatusPerWeekDto.dayOfweek,
          isOpen: createStudioOpenStatusPerWeekDto.isOpen
        },
        select: {
          id: true
        }
      });
    } catch (e) {
      console.log(e);
    }

    return 'This action adds a new studioOpenStatusPerWeek';
  }

  async findAll() {
    const data = await this.prismaService.studioOpenStatusPerWeek.findMany();

    return `This action returns all studioOpenStatusPerWeek`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studioOpenStatusPerWeek`;
  }

  update(id: number, updateStudioOpenStatusPerWeekDto: UpdateStudioOpenStatusPerWeekDto) {
    return `This action updates a #${id} studioOpenStatusPerWeek`;
  }

  remove(id: number) {
    return `This action removes a #${id} studioOpenStatusPerWeek`;
  }
}
