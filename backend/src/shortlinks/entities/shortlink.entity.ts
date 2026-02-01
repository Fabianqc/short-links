import { Exclude } from "class-transformer";

import { Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";
import { UUID } from "crypto";
import { OneToMany } from "typeorm";
import { Statistic } from "../../statistics/entities/statistic.entity";

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


    @OneToMany(() => Statistic, (statistic) => statistic.idShortlink)
    statistics: Statistic[];
}
