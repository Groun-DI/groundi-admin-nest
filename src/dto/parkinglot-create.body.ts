import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
