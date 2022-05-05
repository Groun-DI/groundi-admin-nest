import { Injectable } from '@nestjs/common';
import { StudioRentalPrices as StudioRentalPricesModel } from '@prisma/client';
import { BaseBizException, Exceptions } from "../../errors/http-exceptions";
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Studios as StudioModel } from '@prisma/client';
import { StudioCreateBody } from 'src/dto/studio-create.body';
import { StudioImageCreateBody } from 'src/dto/studio-image-create';
import { StudioUpdateBody } from 'src/dto/studio-update';
import { StudioImageUpdateBody } from 'src/dto/studio-image-update';
import { AmenityUpdateBody } from 'src/dto/amenity-update.body';
import { PrecautionUpdateBody } from 'src/dto/precaution-update.body';
import { ComplimentaryUpdateBody } from 'src/dto/complimentary-update';
import { S3Service } from 'src/services/s3/s3.service';
import { RentalPriceCreateBody } from 'src/dto/rental-price-create.body';
import { HolidayCreateBody } from 'src/dto/holiday-create-body';
import { NationalHolidayCreateBody } from 'src/dto/national-holiday-create-body';

@Injectable()
export class StudioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service
  ) { }

  async studioCreate(centerId: number, images: Array<Express.Multer.File>, body: StudioCreateBody) {
    const uploadImages = await Promise.all(images.map(async (item) => (
      await this.s3Service.uploadImage(item)
    )));

    const studio = await this.prismaService.studios.create({
      data: {
        Centers: {
          connect: {
            id: centerId
          }
        },
        name: body.name,
        checkInNotice: body.checkInNotice,
        description: body.description,
        basicOccupancy: body.basicOccupancy,
        maximumOccupancy: body.maximumOccupancy,
        refundCode: body.refundCode,
        extraPrice: body.extraPrice,
        rentalTimeUnitCode: body.rentalTimeUnitCode,
        StudioAmenities: {
          create:
            body.amenities.map((item) => ({
              Amenities: {
                connect: { id: item },
              },
            }))
        },
        StudioPrecautions: {
          create:
            body.precautions.map((item) => ({
              Precautions: {
                connect: { id: item },
              },
            }))
        },
        StudioComplimentaries: {
          create:
            body.complimentaries.map((item) => ({
              Complimentaries: {
                connect: { id: item },
              },
            }))
        },
        StudioImages: {
          create: uploadImages.map((item) => ({
            order: 0,
            image: item.Location
          }))
        }
      }
    });

    if (!studio) throw new BaseBizException(Exceptions.CREATE_STUDIO_FAILED);

    return studio;
  }

  async rentalPriceCreate(studioId: number, body: RentalPriceCreateBody) {
    const res = await this.prismaService.studioRentalPrices.create({
      data: {
        Studios: {
          connect: {
            id: studioId
          }
        },
        startAt: body.startAt,
        price: body.price,
        DayOfWeeks: {
          connect: {
            id: body.dayOfweekId
          }
        }
      }
    });

    return res;
  }

  async holidaysCreate(studioId: number, body: HolidayCreateBody) {
    const res = await this.prismaService.studioHoliday.create({
      data: {
        Studios: {
          connect: {
            id: studioId
          }
        },
        date: body.date,
        reason: body.reason
      }
    });

    return res;
  }

  async nationalHolidaysCreate(studioId: number, body: NationalHolidayCreateBody) {
    const res = await this.prismaService.studioNationalHolidays.create({
      data: {
        Studios: {
          connect: {
            id: studioId
          }
        },
        NationalHolidays: {
          connect: {
            id: body.nationalHolidayId
          }
        }
      }
    });

    return res;
  }
  studioImageCreate(studioId: number, body: StudioImageCreateBody) {
    return '';
  }

  async amenityUpdate(studioId: number, body: AmenityUpdateBody[]) {
    await this.prismaService.studioAmenities.deleteMany({ where: { studioId: studioId } }).then(async (res) => {
      if (res) {
        await Promise.all(body.map((item) => {
          this.prismaService.studioAmenities.create({
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
    await this.prismaService.studioPrecautions.deleteMany({ where: { studioId: studioId } }).then(async (res) => {
      if (res) {
        await Promise.all(body.map((item) => {
          this.prismaService.studioPrecautions.create({
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
    await this.prismaService.studioComplimentaries.deleteMany({ where: { studioId: studioId } }).then(async (res) => {
      await Promise.all(body.map((item) => {
        this.prismaService.studioComplimentaries.create({
          data: {
            studioId: studioId,
            complimentaryId: item.complimentaryId
          }
        });
      }))
    });
  }

  async studioUpdate(studioId: number, body: StudioUpdateBody): Promise<StudioModel> {
    const studio = await this.prismaService.studios.update({
      where: { id: studioId },
      data: {
        name: body.name,
        checkInNotice: body.checkInNotice,
        description: body.description,
        basicOccupancy: +body.basicOccupancy,
        maximumOccupancy: +body.maximumOccupancy,
        refundCode: body.refundCode,
        extraPrice: +body.extraPrice,
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
    const studio = await this.prismaService.studios.deleteMany({
      where: { id: studioId }
    });

    return studio;
  }

  async studioImageDelete(imageId: number) {
    const studio = await this.prismaService.studioImages.delete({
      where: { id: imageId }
    });

    return studio;
  }

  async rentalPriceFindAll(studioId:number):Promise<StudioRentalPricesModel[]>{
    const res = await this.prismaService.studioRentalPrices.findMany({
      where:{
        studioId: studioId
      }
    });

    return res;
  }

  async studioFindAll(centerId: number) {
    const studios = await this.prismaService.studios.findMany({
      where: { centerId: centerId },
    });

    if (!studios) throw new BaseBizException(Exceptions.STUDIO_NOTFOUND);

    return studios;
  }

  async studioFindOne(studioId: number): Promise<StudioModel> {
    const studio = await this.prismaService.studios.findUnique({
      where: { id: studioId },
      include: {
        StudioComplimentaries: true,
        StudioAmenities: true,
        StudioPrecautions: true
      }
    });

    return studio;
  }
}
