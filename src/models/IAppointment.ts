import { DomainEntity } from 'src/common/types/DomainEntity';

export interface Appointment extends DomainEntity {
  date: Date;
  patient_id?: number;
  doctor_id: number;
  newPatient: boolean;
}
