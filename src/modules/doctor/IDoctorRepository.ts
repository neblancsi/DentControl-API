import { Doctor } from '../../models/IDoctor';

export interface IDoctorRepository {
  Create(doctor: Doctor): Promise<void>;
}
