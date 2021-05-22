import { Appointment } from './IAppointment';

export interface Doctor {
  id: number;
  name: string;
  email: string;
  appointments?: Appointment[];
}
