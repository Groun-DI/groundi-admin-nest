import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateStudioDailyRentalTimePriceDto } from './dto/create-studio-daily-rental-time-price.dto';
import { UpdateStudioDailyRentalTimePriceDto } from './dto/update-studio-daily-rental-time-price.dto';

@Injectable()
export class StudioDailyRentalTimePriceService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createStudioDailyRentalTimePriceDto: CreateStudioDailyRentalTimePriceDto) {
    let generatedId: { id: bigint };

    try {
      generatedId = await this.prismaService.studioDailyRentalTimePrice.create({
        data: {
          weekId: createStudioDailyRentalTimePriceDto.weekId,
          startAt: createStudioDailyRentalTimePriceDto.startAt,
          price: createStudioDailyRentalTimePriceDto.price
        },
        select: {
          id: true
        }
      })
    } catch (e) {
      console.log(e);
    }

    return 'This action adds a new studioDailyRentalTimePrice';
  }

  async findAll() {
    const data = await this.prismaService.studioDailyRentalTimePrice.findMany();

    return data;
  }

  async findOne(dayOfweek: string) {
    const data = await this.prismaService.studioDailyRentalTimePrice.findMany({
      
    });

    return data;
    
  }

  async remove(weekId: number) {
    try {
      await this.prismaService.studioDailyRentalTimePrice.deleteMany({
        where: { weekId: weekId }
      })
    } catch (e) {
      console.log(e);
    }

    return `This action removes a #${weekId} studioDailyRentalTimePrice`;
  }
}
