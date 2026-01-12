import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'idUsers' })
  @Exclude()
  id: UUID;

  @Column({ name: 'User' })
  username: string;

  @Column({ name: 'PassHash', nullable: true })
  @Exclude() //this moment the frontend never send the password hash
  password: string;

  @Column({ name: 'IdGoogle', nullable: true })
  googleId: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({
    name: 'Create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
