import { PrimaryColumn } from "typeorm";
import { UUID } from "crypto";

export class UsersHasShortlink {

    @PrimaryColumn({type: 'uuid', name:"Users_idUsers"})
    userId: UUID;

    @PrimaryColumn({type: 'uuid', name:"ShortLinks_idShortLinks"})
    shortlinkId: UUID;
}
