import { IsNotEmpty, IsString } from 'class-validator';

export class StudioImageUpdateBody {
    @IsNotEmpty()
    @IsString()
    readonly image: File;
}
