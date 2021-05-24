import { DomainEntity } from 'src/common/types/DomainEntity';
import { Appointment } from './IAppointment';

export interface Patient extends DomainEntity {
  name: string;
  email: string;
  birthDate: Date;
  appointments?: Appointment[];
}
