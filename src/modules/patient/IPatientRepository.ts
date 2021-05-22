import { Patient } from '../../models/IPatient';

export interface IPatientRepository {
  Create(patient: Patient): Promise<void>;
}
