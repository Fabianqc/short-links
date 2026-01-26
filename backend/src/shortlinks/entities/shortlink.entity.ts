import { Exclude } from "class-transformer";

import { Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";
import { UUID } from "crypto";

@Entity("shortlinks")
export class Shortlink {
    @PrimaryGeneratedColumn('uuid', { name: 'idShortLinks' })
    @Exclude()
    id: UUID;

    @Column({ name: "OriginalLink" })
    url: string;

    @Column({ name: "ShortLink" })
    shortUrl: string;

    @Column({
        name: 'CreateTime',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime: Date;

    @Generated('increment')
    @Column({ name: 'count', type: 'integer' })
    @Exclude()
    count: number;
}
