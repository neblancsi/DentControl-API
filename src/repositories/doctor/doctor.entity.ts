import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity()
export class DoctorEntity extends BaseEntity {
  @PrimaryGeneratedColumn() //TODO uuid
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.doctor, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  appointments: AppointmentEntity[];
}
