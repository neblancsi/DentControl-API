import { IsBoolean, IsInt, IsISO8601, IsOptional } from 'class-validator';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { PatientEntity } from 'src/repositories/patient/patient.entity';

export class CreateAppointmentDTO {
  @IsISO8601()
  public readonly date: Date;
  @IsInt()
  public readonly doctor_id: number;
  @IsOptional()
  @IsInt()
  public readonly patient_id?: number;
  @IsBoolean()
  public readonly newPatient: boolean;
}

export class UpdateAppointmentDTO {
  @IsOptional()
  @IsISO8601()
  public readonly date?: Date;
  @IsOptional()
  @IsInt()
  public readonly doctor_id?: number;
  @IsOptional()
  @IsInt()
  public readonly patient_id?: number;
}

export class GetAllAppointmentsDTO {
  public readonly id: number;
  public readonly date: Date;
  public readonly newPatient: boolean;
}

export class GetAppointmentDTO extends GetAllAppointmentsDTO {
  public readonly doctor: DoctorEntity;
  public readonly patient?: PatientEntity;
}
