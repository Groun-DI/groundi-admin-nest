import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudioUpdateBody {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNumber()
    readonly basicOccupancy: string;

    @IsNumber()
    readonly maximumOccupancy: string;

    @IsNumber()
    readonly minimumRentalPrice: string;

    @IsNumber()
    readonly maximumRentalPrice: string;

    @IsNumber()
    readonly extraPrice: string;

    @IsString()
    readonly checkInNotice: string;

    @IsString()
    readonly rentalTimeUnitCode: string;

    @IsString()
    readonly refundCode: string;

    @IsArray()
    readonly precautions: string[];

    @IsArray()
    readonly amenities: string[];

    @IsArray()
    readonly complimentaries: string[];
}
