import { Injectable } from '@nestjs/common';
import { DoctorRepository } from 'src/repositories/doctor/doctor.repository';
import { Doctor } from 'src/models/IDoctor';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  public async Create(doctor: Doctor): Promise<void> {
    await this.doctorRepository.Create(doctor);
  }
}
