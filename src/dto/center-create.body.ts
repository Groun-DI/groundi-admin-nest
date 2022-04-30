import { IsNotEmpty, IsString } from 'class-validator';

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
    @IsString()
    readonly latitude: string;

    @IsNotEmpty()
    @IsString()
    readonly longitude: string;

    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly busniessLicenseNumber: string;
}