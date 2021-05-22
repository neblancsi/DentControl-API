import { Doctor } from 'src/models/IDoctor';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity()
export class DoctorEntity extends BaseEntity implements Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.doctor_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  appointments: AppointmentEntity[];
}
