import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class RentalRequestFormsCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly date: string;

    @IsNotEmpty()
    @IsString()
    readonly time: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    readonly numberOfpeople: number;

    @IsNotEmpty()
    @IsString()
    readonly discription: string;

    @IsNotEmpty()
    @IsString()
    readonly rentalTypeCode: string;

    @IsNotEmpty()
    @IsString()
    readonly responseTypeCode: string;
}
