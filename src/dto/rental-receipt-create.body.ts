import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RentalReceiptCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly receiptNumber: string;
}
