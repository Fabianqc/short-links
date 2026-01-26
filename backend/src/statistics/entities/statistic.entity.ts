import { Column, Entity, PrimaryColumn } from "typeorm";
import { UUID } from "crypto";
import { Exclude } from "class-transformer";

@Entity("statistics")
export class Statistic {
    @PrimaryColumn({type: 'uuid', name: "idStatistics"})
    @Exclude()
    id: UUID;

    @Column({type: 'uuid', name: "idShortlink"})
    @Exclude()
    idShortlink: UUID;

    @Column({type: 'date', name: "initialDate"})
    initialDate: Date;

    @Column({type: 'date', name: "finalDate"})
    finalDate: Date;

    @Column({type: 'int', name: "totalClicks"})
    totalClicks: number;
    
}
