import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateBreakTimeDto } from './dto/create.controller.dto';
import { StudioBreakTime as StudioBreakTimeModel } from '@prisma/client';

@Injectable()
export class StudioBreaktimeService {
    constructor(private readonly prismaService: PrismaService) { }
    async create(body: CreateBreakTimeDto) {
        let data: { id: bigint };
        try {
            data = await this.prismaService.studioBreakTime.create({
                data: {
                    studioId: body.studioId,
                    week: body.week,
                    startTime: body.startTime,
                    endTime: body.endTime,
                },
                select: {
                    id: true
                }
            });
        } catch (e) {
            console.log(e);
        }

        return data;
    }

    async findAll(studioId: number): Promise<StudioBreakTimeModel[]> {
        let data;
        
        try{
            data = await this.prismaService.studioBreakTime.findMany({
                where: {
                    studioId: studioId
                }
            });
        }catch(e){
            console.log(e);
        }
        

        return data;
    }


}
