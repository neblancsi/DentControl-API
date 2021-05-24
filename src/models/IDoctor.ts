import { DomainEntity } from 'src/common/types/DomainEntity';
import { Appointment } from './IAppointment';

export interface Doctor extends DomainEntity {
  name: string;
  email: string;
  appointments?: Appointment[];
}
