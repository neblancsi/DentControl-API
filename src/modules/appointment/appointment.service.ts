import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from 'src/repositories/appointment/appointment.repository';
import { Appointment } from 'src/models/IAppointment';

@Injectable()
export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async Create(appointment: Appointment): Promise<void> {
    await this.appointmentRepository.Create(appointment);
  }
}
