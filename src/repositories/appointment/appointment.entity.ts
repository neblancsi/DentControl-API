import { Appointment } from 'src/models/IAppointment';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DoctorEntity } from '../doctor/doctor.entity';
import { PatientEntity } from '../patient/patient.entity';

@Entity()
export class AppointmentEntity extends BaseEntity implements Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  newPatient: boolean;

  @ManyToOne(() => PatientEntity, (patient) => patient.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient_id?: number;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor_id: number;
}
