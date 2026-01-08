import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUsers: UUID;

  @Column()
  User: string;

  @Column()
  @Exclude() //this moment the frontend never send the password hash
  PassHash: string;

  @Column()
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
