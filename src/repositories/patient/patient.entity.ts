import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity()
export class PatientEntity extends BaseEntity {
  @PrimaryGeneratedColumn() //TODO uuid
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  appointments: AppointmentEntity[];
}
