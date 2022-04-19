import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StudioHoliday as StudioHolidayModel } from '@prisma/client';
import { ForbiddenException, FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';
import { HolidayCreateBody } from 'src/dto/holiday-create-body';
import { DailyStatusCreateBody } from 'src/dto/daily-status-create.body';
import { DailyRentalPriceCreateBody } from 'src/dto/daily-rental-price-create.body';
import { HolidayUpdateBody } from 'src/dto/holiday-update.body';
import { DailyStatusUpdateBody } from 'src/dto/daily-status-update.body';
import { start } from 'repl';

@Injectable()
export class RentalTimeManagementService {
  constructor(private readonly prismaService: PrismaService) { }

  async holidayCreate(studioId: number, body: HolidayCreateBody) {
    let date = new Date(body.startDate);
    let endDate = new Date(body.endDate);
    let data: { id: bigint };

    try {
      for (date; date <= endDate; date.setDate(date.getDate() + 1)) {
        data = await this.prismaService.studioHoliday.create({
          data: {
            studioId: studioId,
            date: date,
            reason: body.reason,
          },
          select: {
            id: true
          }
        });
      }
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }

    return data;
  }


  async dailyStautsCreate(studioId: number, body: DailyStatusCreateBody) {
    let generatedId: { id: bigint };

    try {
      generatedId = await this.prismaService.studioDailyStatus.create({
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
      generatedId = await this.prismaService.studioDailyRentalPrice.create({
        data: {
          dailyStatusId: body.dailyStatusId,
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

  async holidayDelete(studioId: number, body: HolidayCreateBody) {
    let date = new Date(body.startDate);
    let endDate = new Date(body.endDate);

    try {
      for (date; date <= endDate; date.setDate(date.getDate() + 1)) {
        await this.prismaService.studioHoliday.deleteMany({
          where: {
            studioId: studioId,
            date: date,
          }
        });
      }
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }

    return { "message": "success" };
  }

  async dailyRentalPriceDelete(dailyStatusId: number) {
    try {
      await this.prismaService.studioDailyRentalPrice.deleteMany({
        where: { dailyStatusId: dailyStatusId }
      })
    } catch (e) {
      console.log(e);
    }

    return `This action removes a #${dailyStatusId} studioDailyRentalTimePrice`;
  }

  async holidayFindAll(studioId: number) {
    const data = await this.prismaService.studioHoliday.findMany({
      where: {
        studioId: studioId
      }
    });

    return data;
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
    const data = await this.prismaService.studioDailyStatus.findMany();

    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyStatusFindOne(dailyStatusId: number) {
    return `This action returns all studioOpenStatusPerWeek`;
  }

  async dailyRentalPriceFindAll() {
    const data = await this.prismaService.studioDailyRentalPrice.findMany();

    return data;
  }

  async dailyRentalPriceFindOne() {
    const data = await this.prismaService.studioDailyRentalPrice.findMany({

    });

    return data;
  }
}
