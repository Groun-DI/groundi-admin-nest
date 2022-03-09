import { Injectable } from '@nestjs/common';
import { AuthorizationService } from 'src/services/authorization/authorization.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCenterDto, CreateCenterParkingLotDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { Prisma } from '@prisma/client';
import {
  UNAUTHORIZED_TYPE,
  UnauthorizedException,
} from '../../errors/unauthorized.exception';
import {
  FORBIDDEN_TYPE,
  ForbiddenException,
} from '../../errors/forbidden.exception';
import { NaverGeocodingService } from 'src/services/naver-geocoding/naver-geocoding.service';

@Injectable()
export class CenterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authorizationService: AuthorizationService,
    private readonly naverGeocodingService: NaverGeocodingService
  ) { }

  async create(id: number | bigint, body: CreateCenterDto) {
    let center: { id: number | bigint };
    try {
      center = await this.prismaService.center.create({
        data: {
          adminId: Number(id),
          name: body.name,
          address: body.address,
          phoneNumber: body.phoneNumber,
          detailAddress: body.detailAddress,
          latitude: Number(body.latitude),
          longitude: Number(body.longitude)
        },
        select: {
          id: true
        }
      })
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
    return { message: "success" }
  }

  async parkingLotCreate(body: CreateCenterParkingLotDto) {
    let resData: { centerId: number | bigint};
    try {
      resData = await this.prismaService.centerParkingLot.create({
        data: {
          centerId: Number(body.centerId),
          isAvailable: body.isAvailable,
          paymentType: body.paymentType,
          firstTime: body.firstTime,
          firstPayment: Number(body.firstPayment),
          additionTime: body.additionTime,
          additionPayment: Number(body.additionPayment),
          allDayPayment: Number(body.allDayPayment),
          oneTimePayment: Number(body.oneTimePayment),
          content: body.content
        },
        select: {
          centerId: true
        }
      })
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
    return { message: "success" }
  }

  async findAll(id: number | bigint) {
    (BigInt.prototype as any).toJSON = function () {
      return parseInt(this.toString());
    };
    try {
      const centers = this.prismaService.center.findMany({
        where: {
          adminId: id
        }
      });
      console.log(centers);

      return centers;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new UnauthorizedException(UNAUTHORIZED_TYPE.USER_EXIST);
      }
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    }
  }

  async getGeoCodingService(address: string): Promise<any> {
    const smsRes = await this.naverGeocodingService.sendAdress(address).catch(() => {
      throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    });

    return smsRes;
  }

  findOne(id: number) {
    return `This action returns a #${id} center`;
  }

  update(id: number, updateCenterDto: UpdateCenterDto) {
    return `This action updates a #${id} center`;
  }

  remove(id: number) {
    return `This action removes a #${id} center`;
  }
}
