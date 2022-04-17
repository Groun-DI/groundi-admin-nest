import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StudioHoliday as StudioHolidayModel } from '@prisma/client';

@Injectable()
export class RentalTimeManagementService {
  constructor(private readonly prismaService: PrismaService) { }

  async holidayCreate(body: CreateHolidayDto) {
    let data: { id: bigint };
    try {
      data = await this.prismaService.studioHoliday.create({
        data: {
          studioId: body.studioId,
          date: body.date,
          reason: body.reason,
        },
        select: {
          id: true
        }
      });
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }

    return data;
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

  async dailyRentalTimePriceCreate(createStudioDailyRentalTimePriceDto: CreateStudioDailyRentalTimePriceDto) {
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

  async holidayUpdate(id: number, body: UpdateHolidayDto) {
    let data: { id: bigint };

    try {
      data = await this.prismaService.studioHoliday.update({
        where: {
          id: id
        },
        data: {
          studioId: body.studioId,
          date: body.date,
          reason: body.reason
        },
        select: {
          id: true
        }
      });
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }

    return data;
  }

  async dailyStautsUpdate() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayDelete() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalTimePriceDelete(dailyId: number) {
    try {
      await this.prismaService.studioDailyRentalTimePrice.deleteMany({
        where: { weekId: dailyId }
      })
    } catch (e) {
      console.log(e);
    }

    return `This action removes a #${dailyId} studioDailyRentalTimePrice`;
  }

  async holidayFindAll() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayFindOne(studioId: number, datetime: string): Promise<StudioHolidayModel> {
    const data = await this.prismaService.studioHoliday.findFirst({
      where: {
        date: datetime,
        studioId: studioId
      }
    });

    return data;

  }

  async dailyStatusFindAll() {
    const data = await this.prismaService.studioOpenStatusPerWeek.findMany();

    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStatusFindOne() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalTimePriceFindAll() {
    const data = await this.prismaService.studioDailyRentalTimePrice.findMany();

    return data;
  }

  async dailyRentalTimePriceFindOne() {
    const data = await this.prismaService.studioDailyRentalTimePrice.findMany({
      
    });

    return data;
  }
}
