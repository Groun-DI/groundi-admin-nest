
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

}
