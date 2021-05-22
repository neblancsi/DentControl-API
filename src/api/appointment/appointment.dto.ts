export class CreateAppointmentDTO {
  public readonly date: Date;
  public readonly doctor: number;
  public readonly patient?: number;
  public readonly newPatient: boolean;
}

//TODO validation
