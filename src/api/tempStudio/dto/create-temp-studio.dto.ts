
import { IsNotEmpty, IsNumber, IsString, IsEmpty, IsArray, IsBoolean } from 'class-validator';

export class CreateTempStudioDto {
    @IsNumber()
    @IsNotEmpty()
    readonly centerId: number;

    @IsString()
    readonly name: string;

    @IsString()
    readonly content: string;

    @IsNumber()
    readonly basicOccupancy: number;

    @IsNumber()
    readonly maximumOccupancy: number;

    @IsNumber()
    readonly overCharge: number;

    @IsNumber()
    readonly lowestPrice: number;

    @IsNumber()
    readonly highestPrice: number;

    @IsArray()
    readonly amenities: string[];

    @IsArray()
    readonly precautions: string[];

    @IsArray()
    readonly complimentaries: string[];

    @IsString()
    readonly refundCode: string;

    @IsString()
    readonly precautionContent: string;

    @IsBoolean()
    readonly parkingIsAvailable: boolean;

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
