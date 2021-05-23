import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateAppointmentDTO {
  @IsDateString()
  public readonly date: Date;
  @IsInt()
  public readonly doctor: number;
  @IsOptional()
  @IsInt()
  public readonly patient?: number;
  @IsBoolean()
  public readonly newPatient: boolean;
}
