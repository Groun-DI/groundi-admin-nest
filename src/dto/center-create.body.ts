import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCenterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    readonly detailAddress: string;

    @IsNotEmpty()
    @IsNumber()
    readonly latitude: number;

    @IsNotEmpty()
    @IsNumber()
    readonly longitude: number;

    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly busniessLicenseNumber: string;
}

export class CreateCenterParkingLotDto {
    @IsNotEmpty()
    @IsBoolean()
    readonly isAvailable: boolean;

    @IsNotEmpty()
    @IsString()
    readonly paymentTypeCode: string;

    @IsNotEmpty()
    @IsString()
    readonly firstTime: string;

    @IsNotEmpty()
    @IsNumber()
    readonly firstTimeCharge: number;

    @IsNotEmpty()
    @IsString()
    readonly additionTime: string;

    @IsNotEmpty()
    @IsNumber()
    readonly additionTimeCharge: number;

    @IsNotEmpty()
    @IsNumber()
    readonly oneTimeCharge: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maximumCharge: number;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}