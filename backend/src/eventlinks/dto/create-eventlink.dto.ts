import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateEventlinkDto {
    @IsNotEmpty({
        message: "Url is required",
    })
    @IsString({
        message: "Url must be a string",
    })
    @IsUrl({
        require_tld: true,  
    },
    {
        message: "Url must be a valid url",
    }
    )
    url: string;

}
