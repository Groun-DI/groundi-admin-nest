import { IsNotEmpty, IsString } from 'class-validator';

export class StudioImageCreateBody {
    @IsNotEmpty()
    @IsString()
    readonly image: File;
}
