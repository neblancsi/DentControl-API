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
export class AppointmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn() //TODO uuid
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
  patient?: PatientEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
