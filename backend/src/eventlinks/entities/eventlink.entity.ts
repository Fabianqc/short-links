import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

export enum EventLinkType {
    CREATED = 'CREATED',
    DELETED = 'DELETED',
    UPDATED = 'UPDATED',
    
}
@Entity()
export class Eventlink {
    @PrimaryGeneratedColumn('uuid', { name: 'idEventLink' })
    @Exclude()
    id: UUID;

    @Column({name: 'ShortLinks_idShortLinks'})
    @Exclude()
    shortlinkId: UUID;

    @Column({name:'EventLinks', type: 'enum', enum: EventLinkType })
    @Exclude()
    eventLinks: EventLinkType;

    @Column({name: 'Description', type: 'varchar', length: 255 })
    description: string;
    
    @Column({name: 'EventTime', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    eventTime: Date;
}
