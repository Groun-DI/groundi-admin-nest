import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateStudioOpenStatusPerWeekDto } from './dto/create-studio-open-status-per-week.dto';
import { UpdateStudioOpenStatusPerWeekDto } from './dto/update-studio-open-status-per-week.dto';

@Injectable()
export class RentalTimeManagementService {
  constructor(private readonly prismaService: PrismaService) { }

  async holidayCreate() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStautsCreate() {
    let generatedId: { id: bigint };

    // try {
    //   generatedId = await this.prismaService.studioOpenStatusPerWeek.create({
    //     data: {
    //       id: Number(createStudioOpenStatusPerWeekDto.studioId.toString() + createStudioOpenStatusPerWeekDto.studioId.toString()),
    //       studioId: createStudioOpenStatusPerWeekDto.studioId,
    //       dayOfweek: createStudioOpenStatusPerWeekDto.dayOfweek,
    //       isOpen: createStudioOpenStatusPerWeekDto.isOpen
    //     },
    //     select: {
    //       id: true
    //     }
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

  
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalTimePriceCreate() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayUpdate() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStautsUpdate() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayDelete() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalTimePriceDelete() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayFindAll() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayFindOne() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStatusFindAll() {
    const data = await this.prismaService.studioOpenStatusPerWeek.findMany();

    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStatusFindOne() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalTimePriceFindAll() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalTimePriceFindOne() {
    return `This action returns all studioOpenStatusPerWeek`;
  }
}
