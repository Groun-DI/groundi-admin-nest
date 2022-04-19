import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ComplimentaryUpdateBody {
    @IsNotEmpty()
    @IsString()
    readonly complimentaryId: string;
}
