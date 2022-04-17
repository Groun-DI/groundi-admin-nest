import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ForbiddenException, FORBIDDEN_TYPE } from 'src/errors/forbidden.exception';
import { UnauthorizedException, UNAUTHORIZED_TYPE } from 'src/errors/unauthorized.exception';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Studio as StudioModel } from '@prisma/client';
import { StudioCreateBody } from 'src/dto/studio-create.body';
import { StudioImageCreateBody } from 'src/dto/studio-image-create';
import { StudioUpdateBody } from 'src/dto/studio-update';
import { StudioImageUpdateBody } from 'src/dto/studio-image-update';

@Injectable()
export class StudioService {
  constructor(private readonly prismaService: PrismaService) { }
  async studioCreate(centerId: number, body: StudioCreateBody) {
    let studio: { id: number | bigint };

    const createAmenities = body.amenities.map((item) => ({
      AmenityList: {
        connect: { id: item },
      },
    }
    ));
    const createPrecautions = body.precautions.map((item) => ({
      PrecautionList: {
        connect: { id: Number(item) },
      },
    }
    ));

    const createComplimentaries = body.complimentaries.map((item) => ({
      ComplimentaryList: {
        connect: { id: item },
      },
    }
    ));

    try {
      studio = await this.prismaService.studio.create({
        data: {
          centerId: centerId,
          name: body.name,
          checkInNotice: body.checkInNotice,
          description: body.description,
          basicOccupancy: body.basicOccupancy,
          maximumOccupancy: body.maximumOccupancy,
          refundCode: body.refundCode,
          extraPrice: body.extraPrice,
          minimumRentalPrice: body.minimumRentalPrice,
          maximumRentalPrice: body.maximumRentalPrice,
          rentalTimeUnitCode: body.rentalTimeUnitCode,
          StudioAmenity: { create: createAmenities },
          StudioPrecaution: { create: createPrecautions },
          StudioComplimentary: { create: createComplimentaries },
        },
        select: {
          id: true
        }
      });

      // await this.prismaService.centerParkingLot.create({
      //   data: {
      //     isAvailable: body.parkingIsAvailable,
      //     paymentType: body.parkingPaymentType,
      //     firstHour: body.parkingFirstHour,
      //     firstMinute: body.parkingFirstMinute,
      //     firstPayment: body.parkingFirstPayment,
      //     additionHour: body.parkingAdditionHour,
      //     additionMinute: body.parkingAdditionMinute,
      //     additionPayment: body.parkingAdditionPayment,
      //     allDayPayment: body.parkingAllDayPayment,
      //     oneTimePayment: body.parkingOneTimePayment,
      //     content: body.parkingContent
      //   }
      // })
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
    
    return Number(studio.id);
  }

  studioImageCreate(studioId: number, body: StudioImageCreateBody) {
    return '';
  }


  studioUpdate(studioId: number, body: StudioUpdateBody) {
    return '';
  }

  studioImageUpdate(studioId: number, body: StudioImageUpdateBody) {
    return '';
  }

  studioDelete(studioId: number) {
    return '';
  }

  studioImageDelete(studioId: number) {
    return '';
  }

  async studioFindAll(centerId: number) {
    const studios = await this.prismaService.studio.findMany({
      where: { centerId: centerId },
    });

    if (!studios) throw new UnauthorizedException(UNAUTHORIZED_TYPE.NO_MEMBER);

    return studios;
  }

  studioFindOne(studioId: number) {
    return '';
  }
}
