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
}

export class CreateCenterParkingLotDto {
    @IsNotEmpty()
    @IsNumber()
    readonly centerId: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly isAvailable: boolean;

    @IsNotEmpty()
    @IsString()
    readonly paymentType: string;

    @IsNotEmpty()
    @IsString()
    readonly firstTime: string;

    @IsNotEmpty()
    @IsNumber()
    readonly firstPayment: number;

    @IsNotEmpty()
    @IsString()
    readonly additionTime: string;

    @IsNotEmpty()
    @IsNumber()
    readonly additionPayment: number;

    @IsNotEmpty()
    @IsNumber()
    readonly allDayPayment: number;

    @IsNotEmpty()
    @IsNumber()
    readonly oneTimePayment: number;

    @IsNotEmpty()
    @IsString()
    readonly content: string;
}
