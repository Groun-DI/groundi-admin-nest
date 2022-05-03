import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCenterDto } from '../../dto/center-create.body';
import { UpdateCenterDto } from '../../dto/center-update.body';
import { BaseBizException, Exceptions } from '../../errors/http-exceptions';
import { KlidSearchAddressService } from 'src/services/klid-search-address/klid-search-address.service';
import { Centers as CentersModel } from "@prisma/client";
import { CenterParkingLots as CenterParkingLotsModel } from "@prisma/client";
import { S3Service } from 'src/services/s3/s3.service';
import { CreateCenterParkingLotDto } from 'src/dto/parkinglot-create.body';
import { ParkingLotUpdateBody } from 'src/dto/parkinglot-update.body';
import { NaverGeocodingService } from 'src/services/naver-geocoding/naver-geocoding.service';

@Injectable()
export class CenterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly naverGeocodingService: NaverGeocodingService,
    private readonly klidSearchAddressService: KlidSearchAddressService,
    private readonly s3Service: S3Service
  ) { }

  async centerCreate(userId: number, busniessLicenseFile: Express.Multer.File, body: CreateCenterDto): Promise<CentersModel> {
    const uploadFile = await this.s3Service.uploadImage(busniessLicenseFile);

    const center = await this.prismaService.centers.create({
      data: {
        adminId: userId,
        name: body.name,
        address: body.address,
        detailAddress: body.detailAddress,
        phoneNumber: body.phoneNumber,
        latitude: +body.latitude,
        longitude: +body.longitude,
        busniessLicenseNumber: body.address,
        attachedFileUrlOfBusinessLicense: uploadFile.Location
      }
    })

    if (!center) throw new BaseBizException(Exceptions.CREATE_STUDIO_FAILED);

    return center;
  }


  async centerUpdate(centerId: number, busniessLicenseFile: Express.Multer.File, body: UpdateCenterDto): Promise<CentersModel> {
    let uploadFile = undefined;

    if (busniessLicenseFile) {
      uploadFile = (await this.s3Service.uploadImage(busniessLicenseFile)).Location;
    }

    const center = await this.prismaService.centers.update({
      where: {
        id: centerId
      },
      data: {
        name: body.name,
        address: body.address,
        detailAddress: body.detailAddress,
        phoneNumber: body.phoneNumber,
        latitude: +body.latitude,
        longitude: +body.longitude,
        busniessLicenseNumber: body.busniessLicenseNumber,
        attachedFileUrlOfBusinessLicense: uploadFile
      }
    })

    if (!center) throw new BaseBizException(Exceptions.CREATE_STUDIO_FAILED);

    return center;
  }

  async parkingLotCreate(centerId: number, body: CreateCenterParkingLotDto): Promise<CenterParkingLotsModel> {
    const parkingLot = await this.prismaService.centerParkingLots.create({
      data: {
        centerId: centerId,
        isAvailable: body.isAvailable,
        paymentTypeCode: body.paymentTypeCode,
        firstTime: body.firstTime,
        firstTimeCharge: body.firstTimeCharge,
        additionTime: body.additionTime,
        additionTimeCharge: body.additionTimeCharge,
        maximumCharge: body.maximumCharge,
        oneTimeCharge: body.oneTimeCharge,
        description: body.description
      }
    })

    return parkingLot
  }

  async parkingLotUpdate(centerId: number, body: ParkingLotUpdateBody): Promise<CenterParkingLotsModel> {
    const parkingLot = await this.prismaService.centerParkingLots.update({
      where: {
        centerId: centerId
      },
      data: {
        isAvailable: body.isAvailable,
        paymentTypeCode: body.paymentTypeCode,
        firstTime: body.firstTime,
        firstTimeCharge: body.firstTimeCharge,
        additionTime: body.additionTime,
        additionTimeCharge: body.additionTimeCharge,
        maximumCharge: body.maximumCharge,
        oneTimeCharge: body.oneTimeCharge,
        description: body.description
      }
    })

    return parkingLot
  }

  async centerFindAll(userId: number): Promise<CentersModel[]> {
    const centers = this.prismaService.centers.findMany({
      where: {
        adminId: userId
      }
    });

    return centers;
  }

  async centerDelete(centerId: number): Promise<CentersModel> {
    const center = this.prismaService.centers.delete({
      where: {
        id: centerId
      }
    });

    return center;
  }


  async centerFindOne(centerId: number): Promise<CentersModel> {
    const center = this.prismaService.centers.findUnique({
      where: {
        id: centerId
      }
    });

    return center;
  }

  async getAddressesOfSearchResults(keyword: string): Promise<any> {
    const addresses = await this.klidSearchAddressService.getAddressesOfSearchResults(keyword).catch(() => {
      // throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    });

    return addresses;
  }


  async getAddressesGeocode(address: string): Promise<any> {
    const geocode = await this.naverGeocodingService.sendAdress(address).catch(() => {
      // throw new ForbiddenException(FORBIDDEN_TYPE.TYPE_ERR);
    });

    return geocode;
  }
}
