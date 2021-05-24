import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Doctor } from 'src/models/IDoctor';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from 'src/common/interfaces/IRepository';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';

@Injectable()
export class DoctorService implements IRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

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

  public async GetAll(): Promise<DoctorEntity[]> {
    try {
      return await this.doctorRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async GetByID(id): Promise<DoctorEntity> {
    try {
      return await this.doctorRepository.findOne(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
