import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateRentalTimeDto } from './dto/create-rentaltime.controller.dto';
import { UpdateRentalTimeDto } from './dto/update-rentaltime.controller.dto';
import { StudioRentalTime as StudioRentaltimeModel } from '@prisma/client'
import { FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';

@Injectable()
export class StudioRentaltimeService {
    constructor(private readonly prismaService: PrismaService) { }
    async create(body: CreateRentalTimeDto) {
        let data: { id: bigint };
        try {
            data = await this.prismaService.studioRentalTime.create({
                data: {
                    studioId: body.studioId,
                    openHours: body.openHours,
                    closedHours: body.closedHours,
                    minimumReantalTime: body.minimumReantalTime,
                    rentalTimeUnit: body.rentalTimeUnit
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

    async findOne(studioId: number): Promise<StudioRentaltimeModel> {
        const data = await this.prismaService.studioRentalTime.findUnique({
            where: { studioId: studioId }
        });
        return data;
    }

    async update(studioId: number, body: UpdateRentalTimeDto) {
        let data: { id: bigint };
        try {
            data = await this.prismaService.studioRentalTime.update({
                where:{
                    studioId: studioId
                },
                data: {
                    studioId: body.studioId,
                    openHours: body.openHours,
                    closedHours: body.closedHours,
                    minimumReantalTime: body.minimumReantalTime,
                    rentalTimeUnit: body.rentalTimeUnit
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
