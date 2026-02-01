import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "crypto";
import { Exclude } from "class-transformer";
import { Shortlink } from "../../shortlinks/entities/shortlink.entity";
import { JoinColumn } from "typeorm";

@Entity("statistics")
export class Statistic {
    @Column()
    @PrimaryGeneratedColumn("uuid", {name: "IdStatistics"} )
    @Exclude()
    id:UUID;

    @ManyToOne(() => Shortlink, (shortlink) => shortlink.statistics)
    @JoinColumn({name: "ShortLinks_idShortLinks"})
    @Column()
    @PrimaryColumn("uuid", {name: "ShortLinks_idShortLinks"} )
    @Exclude()
    idShortlink:UUID;

    @Column({type: "varchar", length: 20, name: "Ip"})
    @Exclude()
    ip:string;

    @Column({type: "varchar", length: 2, name: "Country"})
    country:string;
    
    @Column({type: "varchar", length: 170, name: "City"})
    city:string;

    @Column({type: "varchar", length: 100, name: "Browser"})
    browser:string;

    @Column({type: "varchar", length: 100, name: "Os"})
    os:string;

    @Column({type: "varchar", length: 100, name: "Device"})
    device:string;

    @Column({type: "varchar", length: 255, name: "Referer"})
    referrer:string;

    @Column({
        name: "VisitedAt",
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP',
      })
    visitedAt:Date;
}
