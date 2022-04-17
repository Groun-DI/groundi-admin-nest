import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudioCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly basicOccupancy: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maximumOccupancy: number;

    @IsNotEmpty()
    @IsNumber()
    readonly minimumRentalPrice: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maximumRentalPrice: number;

    @IsNotEmpty()
    @IsNumber()
    readonly extraPrice: number;

    @IsNotEmpty()
    @IsString()
    readonly checkInNotice: string;

    @IsNotEmpty()
    @IsString()
    readonly rentalTimeUnitCode: string;

    @IsNotEmpty()
    @IsString()
    readonly refundCode: string;

    @IsNotEmpty()
    @IsArray()
    readonly precautions: string[];

    @IsNotEmpty()
    @IsArray()
    readonly amenities: string[];

    @IsNotEmpty()
    @IsArray()
    readonly complimentaries: string[];
}
