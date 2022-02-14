import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCenterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;
}
