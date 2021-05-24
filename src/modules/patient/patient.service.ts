import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Patient } from 'src/models/IPatient';
import { PatientEntity } from 'src/repositories/patient/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from 'src/common/interfaces/IRepository';

@Injectable()
export class PatientService implements IRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  public async Create(patient: Patient): Promise<void> {
    const { name, birthDate, email } = patient;
    const newPatient = new PatientEntity();
    newPatient.birthDate = birthDate;
    newPatient.email = email;
    newPatient.name = name;

    try {
      await newPatient.save();
    } catch (err) {
      if (err.code === '23502') {
        throw new BadRequestException(err);
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }

  public async GetAll(): Promise<PatientEntity[]> {
    try {
      return await this.patientRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async GetByID(id): Promise<PatientEntity> {
    try {
      return await this.patientRepository.findOne(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
