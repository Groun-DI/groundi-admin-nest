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
  async studioCreate(centerId: number, body: StudioCreateBody): Promise<StudioModel> {
    let studio: StudioModel;

    const createAmenities = body.amenities.map((item) => ({
      AmenityList: {
        connect: { id: item },
      },
    }));

    const createPrecautions = body.precautions.map((item) => ({
      PrecautionList: {
        connect: { id: Number(item) },
      },
    }));

    const createComplimentaries = body.complimentaries.map((item) => ({
      ComplimentaryList: {
        connect: { id: item },
      },
    }));

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
        }
      });
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }

    return studio;
  }

  studioImageCreate(studioId: number, body: StudioImageCreateBody) {
    return '';
  }


  async studioUpdate(studioId: number, body: StudioUpdateBody) {
    let studio: StudioModel;

    try {
      studio = await this.prismaService.studio.update({
        where: { id: studioId },
        data: {
          name: body.name,
          checkInNotice: body.checkInNotice,
          description: body.description,
          basicOccupancy: body.basicOccupancy,
          maximumOccupancy: body.maximumOccupancy,
          refundCode: body.refundCode,
          extraPrice: body.extraPrice,
          minimumRentalPrice: body.minimumRentalPrice,
          maximumRentalPrice: body.maximumRentalPrice,
          rentalTimeUnitCode: body.rentalTimeUnitCode
        }
      });
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
    return studio;
  }

  studioAmenityUpdate(body: string[]) {
    body.map((item) => ({
      AmenityList: {
        connect: { id: item },
      },
    }));
  }

  studioPrecautionUpdate(body: string[]) {

  }

  studioComplimentaryUpdate(body: string[]) {

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
