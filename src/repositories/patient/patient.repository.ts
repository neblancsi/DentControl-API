import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IPatientRepository } from 'src/modules/patient/IPatientRepository';
import { Patient } from 'src/models/IPatient';
import { EntityRepository, Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';

@Injectable()
@EntityRepository(PatientEntity)
export class PatientRepository
  extends Repository<PatientEntity>
  implements IPatientRepository {
  public async Create(patient: Patient): Promise<void> {
    const { name, age, email } = patient;
    const newPatient = new PatientEntity();
    newPatient.age = age;
    newPatient.email = email;
    newPatient.name = name;

    try {
      await newPatient.save();
    } catch (err) {
      if (err.code === '23502') {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
