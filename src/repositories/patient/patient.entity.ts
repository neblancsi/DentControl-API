import { Patient } from 'src/models/IPatient';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity()
export class PatientEntity extends BaseEntity implements Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  appointments: AppointmentEntity[];
}
