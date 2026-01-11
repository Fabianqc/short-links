import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUsers: UUID;

  @Column()
  User: string;

  @Column({nullable: true})
  @Exclude() //this moment the frontend never send the password hash
  PassHash: string;

  @Column({nullable: true})
  IdGoogle: string;

  @Column()
  Email: string;

  @Column()
  Name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  Create_at: Date;
}
