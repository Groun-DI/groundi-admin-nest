import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PrecautionUpdateBody {
    @IsNotEmpty()
    @IsString()
    readonly precautionId: string;
}
