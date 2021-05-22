import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDoctorRepository } from 'src/modules/doctor/IDoctorRepository';
import { Doctor } from 'src/models/IDoctor';
import { EntityRepository, Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Injectable()
@EntityRepository(DoctorEntity)
export class DoctorRepository
  extends Repository<DoctorEntity>
  implements IDoctorRepository {
  public async Create(doctor: Doctor): Promise<void> {
    const { name, email } = doctor;
    const newDoctor = new DoctorEntity();
    newDoctor.email = email;
    newDoctor.name = name;

    try {
      await newDoctor.save();
    } catch (err) {
      if (err.code === '23502') {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
