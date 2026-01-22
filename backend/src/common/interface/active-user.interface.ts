import { UUID } from "crypto";

export default interface ActiveUserInterface {
    userId: UUID;
    email: string;
}