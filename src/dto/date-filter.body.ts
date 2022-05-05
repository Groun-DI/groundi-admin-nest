import { IsString } from 'class-validator';

export class DateFilterDto {
    @IsString()
    startDate: string;

    @IsString()
    endDate: string;
}