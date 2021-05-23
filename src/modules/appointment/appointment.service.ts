import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from 'src/models/IAppointment';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { IRepository } from 'src/common/interfaces/IRepository';

@Injectable()
export class AppointmentService implements IRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  public async Create(appointment: Appointment): Promise<void> {
    const { date, doctor_id, patient_id, newPatient } = appointment;

    let newAppointment;

    if (!newPatient) {
      const patientEntity = await this.appointmentRepository.findOne(
        patient_id,
      );

      const doctorEntity = await this.doctorRepository.findOne(doctor_id);

      if (doctorEntity && patientEntity) {
        newAppointment = new AppointmentEntity();

        newAppointment.date = date;
        newAppointment.doctor_id = doctorEntity.id;
        newAppointment.patient_id = patientEntity.id;
        newAppointment.newPatient = newPatient;
      } else {
        throw new NotFoundException();
      }
    } else {
      const doctorEntity = await this.doctorRepository.findOne(doctor_id);

      if (doctorEntity) {
        newAppointment = new AppointmentEntity();

        newAppointment.date = date;
        newAppointment.doctor_id = doctorEntity.id;
        newAppointment.newPatient = newPatient;
      } else {
        throw new NotFoundException();
      }
    }

    try {
      await newAppointment.save();
    } catch (err) {
      if (err.code === '23502') {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async GetAll(): Promise<AppointmentEntity[]> {
    return await this.appointmentRepository.find();
  }

  public async GetByID(id): Promise<AppointmentEntity> {
    return await this.appointmentRepository.findOne({ id });
  }
}
