import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StudioHoliday as StudioHolidayModel } from '@prisma/client';
import { ForbiddenException, FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';
import { HolidayCreateBody } from 'src/dto/holiday-create.body';
import { DailyStatusCreateBody } from 'src/dto/daily-status-create.body';
import { DailyRentalPriceCreateBody } from 'src/dto/daily-rental-price-create.body';
import { HolidayUpdateBody } from 'src/dto/holiday-update.body';
import { DailyStatusUpdateBody } from 'src/dto/daily-status-update.body';

@Injectable()
export class RentalTimeManagementService {
  constructor(private readonly prismaService: PrismaService) { }

  async holidayCreate(studioId: number, body: HolidayCreateBody) {
    let data: { id: bigint };
    try {
      data = await this.prismaService.studioHoliday.create({
        data: {
          studioId: studioId,
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

  async dailyStautsCreate(studioId: number, body: DailyStatusCreateBody) {
    let generatedId: { id: bigint };

    try {
      generatedId = await this.prismaService.studioOpenStatusPerWeek.create({
        data: {
          studioId: studioId,
          dayOfweek: body.dayOfweek,
          isOpen: body.isOpen
        },
        select: {
          id: true
        }
      });
    } catch (e) {
      console.log(e);
    }

    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalPriceCreate(body: DailyRentalPriceCreateBody) {
    let generatedId: { id: bigint };

    try {
      generatedId = await this.prismaService.studioDailyRentalTimePrice.create({
        data: {
          weekId: body.dailyStatusId,
          startAt: body.startAt,
          price: body.price
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

  async holidayUpdate(holidayId: number, body: HolidayUpdateBody) {
    try {
      const data = await this.prismaService.studioHoliday.update({
        where: {
          id: holidayId
        },
        data: {
          date: body.reason,
        }
      });
      return data;

    } catch (e) {
      console.log(e);
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
  }

  async dailyStautsUpdate(dailyStatusId: number, body: DailyStatusUpdateBody) {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayDelete(holidayId: number) {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalPriceDelete(dailyStatusId: number) {
    try {
      await this.prismaService.studioDailyRentalTimePrice.deleteMany({
        where: { weekId: dailyStatusId }
      })
    } catch (e) {
      console.log(e);
    }

    return `This action removes a #${dailyStatusId} studioDailyRentalTimePrice`;
  }

  async holidayFindAll() {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async holidayFindOne(dailyStatusId: number): Promise<StudioHolidayModel> {
    const data = await this.prismaService.studioHoliday.findUnique({
      where: {
        id: dailyStatusId
      }
    });

    return data;

  }

  async dailyStatusFindAll() {
    const data = await this.prismaService.studioOpenStatusPerWeek.findMany();

    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStatusFindOne(dailyStatusId: number) {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalPriceFindAll() {
    const data = await this.prismaService.studioDailyRentalTimePrice.findMany();

    return data;
  }

  async dailyRentalTimePriceFindOne() {
    const data = await this.prismaService.studioDailyRentalTimePrice.findMany({

    });

    return data;
  }
}
