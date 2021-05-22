import { Appointment } from './IAppointment';

export interface Patient {
  id: number;
  name: string;
  email: string;
  age: number;
  appointments?: Appointment[];
}
