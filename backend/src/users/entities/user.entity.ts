import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  idUsers: UUID;

  @Column()
  User: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  PassHash: Buffer;

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
