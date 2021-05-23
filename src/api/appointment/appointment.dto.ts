import { IsBoolean, IsInt, IsISO8601, IsOptional } from 'class-validator';

export class CreateAppointmentDTO {
  @IsISO8601()
  public readonly date: Date;
  @IsInt()
  public readonly doctor: number;
  @IsOptional()
  @IsInt()
  public readonly patient?: number;
  @IsBoolean()
  public readonly newPatient: boolean;
}

export class GetAppointmentDTO extends CreateAppointmentDTO {
  @IsInt()
  public readonly id: number;
}
