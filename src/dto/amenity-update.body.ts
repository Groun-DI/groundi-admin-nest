import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AmenityUpdateBody {
    @IsNotEmpty()
    @IsString()
    readonly amenityId: string;
}
