
import { IsNotEmpty, IsNumber, IsString, IsEmpty, IsArray, IsBoolean } from 'class-validator';

export class CreateStudioDto {

    @IsNotEmpty()
    @IsNumber()
    readonly centerId: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly introduction: string;

    @IsNotEmpty()
    @IsNumber()
    readonly basicOccupancy: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maximumOccupancy: number;

    @IsNotEmpty()
    @IsNumber()
    readonly extraPrice: number;

    @IsNotEmpty()
    @IsNumber()
    readonly minimumRentalPrice: number;

    @IsNotEmpty()
    @IsNumber()
    readonly maximumRentalPrice: number;

    @IsNotEmpty()
    @IsArray()
    readonly amenities: string[];

    @IsNotEmpty()
    @IsArray()
    readonly precautions: string[];

    @IsNotEmpty()
    @IsArray()
    readonly complimentaries: string[];

    @IsNotEmpty()
    @IsString()
    readonly refundCode: string;

    @IsString()
    readonly precautionContent: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly parkingIsAvailable: boolean;

    @IsNotEmpty()
    @IsString()
    readonly parkingPaymentType: string;

    @IsString()
    readonly parkingFirstHour: string;

    @IsString()
    readonly parkingFirstMinute: string;

    @IsNumber()
    readonly parkingFirstPayment: number;

    @IsString()
    readonly parkingAdditionHour: string;

    @IsString()
    readonly parkingAdditionMinute: string;

    @IsNumber()
    readonly parkingAdditionPayment: number;

    @IsNumber()
    readonly parkingAllDayPayment: number;

    @IsNumber()
    readonly parkingOneTimePayment: number;

    @IsString()
    readonly parkingContent: string;

    @IsNotEmpty()
    @IsString()
    readonly rentalTimeUnitCode : string;

}
