import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseBizException, Exceptions } from "../../errors/http-exceptions";
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Studio as StudioModel } from '@prisma/client';
import { StudioCreateBody } from 'src/dto/studio-create.body';
import { StudioImageCreateBody } from 'src/dto/studio-image-create';
import { StudioUpdateBody } from 'src/dto/studio-update';
import { StudioImageUpdateBody } from 'src/dto/studio-image-update';
import { AmenityUpdateBody } from 'src/dto/amenity-update.body';
import { PrecautionUpdateBody } from 'src/dto/precaution-update.body';
import { ComplimentaryUpdateBody } from 'src/dto/complimentary-update';

@Injectable()
export class StudioService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async studioCreate(userId: number, body: StudioCreateBody) {
    const studio = await this.prismaService.studio.create({
      data: {
        centerId: userId,
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
        StudioAmenity: {
          create:
            body.amenities.map((item) => ({
              AmenityList: {
                connect: { id: item },
              },
            }))
        },
        StudioPrecaution: {
          create:
            body.precautions.map((item) => ({
              PrecautionList: {
                connect: { id: item },
              },
            }))
        },
        StudioComplimentary: {
          create:
            body.complimentaries.map((item) => ({
              ComplimentaryList: {
                connect: { id: item },
              },
            }))
        },
      }
    });

    if (!studio) throw new BaseBizException(Exceptions.CREATE_STUDIO_FAILED);

    return studio;
  }

  studioImageCreate(studioId: number, body: StudioImageCreateBody) {
    return '';
  }

  async amenityUpdate(studioId: number, body: AmenityUpdateBody[]) {
    await this.prismaService.studioAmenity.deleteMany({ where: { studioId: studioId } }).then(async (res) => {
      if (res) {
        await Promise.all(body.map((item) => {
          this.prismaService.studioAmenity.create({
            data: {
              studioId: studioId,
              amenityId: item.amenityId
            }
          });
        }))
      }
    });
  }

  async precautionUpdate(studioId: number, body: PrecautionUpdateBody[]) {
    await this.prismaService.studioPrecaution.deleteMany({ where: { studioId: studioId } }).then(async (res) => {
      if (res) {
        await Promise.all(body.map((item) => {
          this.prismaService.studioPrecaution.create({
            data: {
              studioId: studioId,
              precautionId: item.precautionId
            }
          });
        }))
      }
    });
  }

  async complimentaryUpdate(studioId: number, body: ComplimentaryUpdateBody[]) {
    await this.prismaService.studioComplimentary.deleteMany({ where: { studioId: studioId } }).then(async (res) => {
      await Promise.all(body.map((item) => {
        this.prismaService.studioComplimentary.create({
          data: {
            studioId: studioId,
            complimentaryId: item.complimentaryId
          }
        });
      }))
    });
  }

  async studioUpdate(studioId: number, body: StudioUpdateBody): Promise<StudioModel> {
    const studio = await this.prismaService.studio.update({
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

    if (!studio) throw new BaseBizException(Exceptions.CREATE_STUDIO_FAILED);

    return studio;
  }

  studioImageUpdate(studioId: number, body: StudioImageUpdateBody) {
    return '';
  }

  async studioDelete(studioId: number) {
    const studio = await this.prismaService.studio.deleteMany({
      where: { id: studioId }
    });

    return studio;
  }

  async studioImageDelete(imageId: number) {
    const studio = await this.prismaService.studioImage.delete({
      where: { id: imageId }
    });

    return studio;
  }

  async studioFindAll(userId: number) {
    const studios = await this.prismaService.studio.findMany({
      where: { centerId: userId },
    });

    if (!studios) throw new BaseBizException(Exceptions.STUDIO_NOTFOUND);

    return studios;
  }

  async studioFindOne(studioId: number): Promise<StudioModel> {
    const studio = await this.prismaService.studio.findUnique({
      where: { id: studioId },
      include: {
        StudioComplimentary: true,
        StudioAmenity: true,
        StudioPrecaution: true
      }
    });

    return studio;
  }
}
