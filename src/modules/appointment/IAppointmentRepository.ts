import { Appointment } from 'src/models/IAppointment';

export interface IAppointmentRepository {
  Create(appointment: Appointment): Promise<void>;
}
