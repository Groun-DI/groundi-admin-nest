import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateHolidayDto } from './dto/create-holiday.controller.dto';
import { UpdateHolidayDto } from './dto/update-holiday.controller.dto';
import { StudioHoliday as StudioHolidayModel } from '@prisma/client'
import { FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';

@Injectable()
export class StudioHolidayService {
    constructor(private readonly prismaService: PrismaService) { }
    async create(body: CreateHolidayDto) {
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

    async findOne(studioId: number, datetime: string): Promise<StudioHolidayModel> {
        const data = await this.prismaService.studioHoliday.findFirst({
            where: { 
                date: datetime,
                studioId: studioId
            }
        });

        return data;
    }

    async update(id: number, body: UpdateHolidayDto) {
        let data: { id: bigint };

        try {
            data = await this.prismaService.studioHoliday.update({
                where:{
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

    remove(id: number) {
        return `This action removes a #${id} complimentary`;
    }
}
