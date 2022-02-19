import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudioDto {
    @IsNotEmpty()
    @IsNumber()
    readonly centerId: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsNumber()
    readonly basicOccupancy: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maximumOccupancy: number;

    @IsNotEmpty()
    @IsNumber()
    readonly overCharge: number;

    @IsNotEmpty()
    @IsNumber()
    readonly lowestPrice: number;

    @IsNotEmpty()
    @IsNumber()
    readonly highestPrice: number;
}
