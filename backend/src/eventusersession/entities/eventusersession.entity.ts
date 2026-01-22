import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('eventusersession')
export class Eventusersession {
    @PrimaryGeneratedColumn('uuid', { name: 'idEventUserSession' })
    id: UUID;

    @Column({ name: 'Users_idUsers' })
    userId: UUID;

    @Column({ name: 'Event', type: 'enum', enum: ['UPDATE_USER','CREATE_PASSWORD_USER','CREATE_GOOGLE_USER','LOGIN_SUCCESS','LOGIN_FAILED','LOGOUT','SESSION_REFRESH','PASSWORD_RESET_REQUEST','PASSWORD_RESET_SUCCESS','PASSWORD_RESET_FAILED'] })
    event: string;

    @Column({ name: 'EventTime', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    eventTime: Date;
}
