import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from 'src/common/interfaces/IRepository';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';
import { CreateDoctorDTO } from 'src/api/doctor/doctor.dto';

@Injectable()
export class DoctorService implements IRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  public async Create(dto: CreateDoctorDTO): Promise<void> {
    const { name, email } = dto;
    const newDoctor = DoctorEntity.create({ name, email });

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
      return await this.doctorRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
