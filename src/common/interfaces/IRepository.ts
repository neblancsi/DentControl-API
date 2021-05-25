import { CreateAppointmentDTO } from 'src/api/appointment/appointment.dto';
import { CreateDoctorDTO } from 'src/api/doctor/doctor.dto';
import { CreatePatientDTO } from 'src/api/patient/patient.dto';
import { BaseEntity } from 'typeorm';

export interface IRepository {
  Create(
    arg: CreateDoctorDTO | CreatePatientDTO | CreateAppointmentDTO,
  ): Promise<BaseEntity>;
  GetAll(): Promise<BaseEntity[]>;
  GetByID(id: number): Promise<BaseEntity>;
  DeleteOne(id: number): Promise<void>;
}
