import { IsNotEmpty, IsString } from "class-validator";
import { UUID } from "crypto";


export class CreateStatisticDto {
    @IsNotEmpty({ message: "idShortlink is required" })
    idShortlink: UUID;

    @IsString({ message: "ip must be a string" })
    ip: string;

    @IsString({ message: "country must be a string" })
    country: string;

    @IsString({ message: "city must be a string" })
    city: string;

    @IsString({ message: "browser must be a string" })
    browser: string;

    @IsString({ message: "os must be a string" })
    os: string;

    @IsString({ message: "device must be a string" })
    device: string;

    @IsString({ message: "referrer must be a string" })
    referrer: string;

    visitedAt?: Date;
}
