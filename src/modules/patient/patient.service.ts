import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PatientEntity } from 'src/repositories/patient/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from 'src/common/interfaces/IRepository';
import { CreatePatientDTO } from 'src/api/patient/patient.dto';

@Injectable()
export class PatientService implements IRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  public async Create(dto: CreatePatientDTO): Promise<void> {
    const { name, birthDate, email } = dto;
    const newPatient = PatientEntity.create({ name, birthDate, email });

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
      return await this.patientRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  public async DeleteOne(id): Promise<void> {
    try {
      const appointment = await this.patientRepository.findOneOrFail(id);
      await this.patientRepository.remove(appointment);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
