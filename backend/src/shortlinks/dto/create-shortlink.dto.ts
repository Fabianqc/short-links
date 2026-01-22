import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShortlinkDto {
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsOptional()
    shortUrl?: string;
}
