import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/repositories/patient/patient.repository';
import { Patient } from 'src/models/IPatient';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  public async Create(patient: Patient): Promise<void> {
    await this.patientRepository.Create(patient);
  }
}
