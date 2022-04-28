import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseBizException, Exceptions } from 'src/errors/http-exceptions';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTempStudioDto } from './dto/create-temp-studio.dto';
import { UpdateTempStudioDto } from './dto/update-temp-studio.dto';
import { Studios as StudiosModel } from '@prisma/client';

@Injectable()
export class TempStudioService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(body: CreateTempStudioDto) {
    let studio: { id: number | bigint };

    const createAmenities = body.amenities.map((item) => ({
      Amenities: {
        connect: { id: item },
      },
    }
    ));
    const createPrecautions = body.precautions.map((item) => ({
      Precautions: {
        connect: { id: Number(item) },
      },
    }
    ));

    const createComplimentaries = body.complimentaries.map((item) => ({
      Complimentaries: {
        connect: { id: item },
      },
    }
    ));

    try {
      studio = await this.prismaService.tempStudio.create({
        data: {
          centerId: body.centerId,
          name: body.name,
          content: body.content,
          basicOccupancy: body.basicOccupancy,
          maximumOccupancy: body.maximumOccupancy,
          refundCode: body.refundCode,
          overCharge: body.overCharge,
          lowestPrice: body.lowestPrice,
          highestPrice: body.highestPrice,
          precautionContent: body.precautionContent,
          TempStudioAmenity: { create: createAmenities },
          // TempStudioPrecaution: { create: createPrecautions },
          TempStudioComplimentary: { create: createComplimentaries },
        },
        select: {
          id: true
        }
      });

      await this.prismaService.centerParkingLots.create({
        data:{
          isAvailable: body.parkingIsAvailable,
          paymentTypeCode: body.parkingPaymentType,
          firstTime: body.parkingFirstHour,
          firstTimeCharge: body.parkingFirstPayment,
          additionTime: body.parkingAdditionHour,
          additionTimeCharge: body.parkingAdditionPayment,
          maximumCharge: body.parkingAllDayPayment,
          oneTimeCharge: body.parkingOneTimePayment,
          description: body.parkingContent
        }
      })
    } catch (e) {
      console.log(e);
    }
    return Number(studio.id);
  }

  async findAll(centerId: number):Promise<StudiosModel[]> {
    const studios = await this.prismaService.studios.findMany({
      where: { centerId: centerId },
    });
    
    return studios;
  }

  findOne(id: number) {
    return `This action returns a #${id} precaution`;
  }

  update(id: number, updateStudioDto: UpdateTempStudioDto) {
    return `This action updates a #${id} precaution`;
  }

  remove(id: number) {
    return `This action removes a #${id} precaution`;
  }
}
