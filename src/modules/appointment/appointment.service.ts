import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { IRepository } from 'src/common/interfaces/IRepository';
import { PatientEntity } from 'src/repositories/patient/patient.entity';
import {
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from 'src/api/appointment/appointment.dto';
import { AppointmentState } from 'src/common/enums/appointment-state.enum';
import { networkInterfaces } from 'os';

@Injectable()
export class AppointmentService implements IRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  public async Create(dto: CreateAppointmentDTO): Promise<AppointmentEntity> {
    const { date, doctor_id, patient_id, newPatient } = dto;

    let newAppointment: AppointmentEntity;

    if (!newPatient) {
      try {
        const patientEntity = await this.patientRepository.findOneOrFail(
          patient_id,
        );

        const doctorEntity = await this.doctorRepository.findOneOrFail(
          doctor_id,
        );

        newAppointment = AppointmentEntity.create({
          date: date,
          doctor: doctorEntity,
          patient: patientEntity,
          newPatient: newPatient,
          appointmentState: AppointmentState.TO_BE_STARTED,
        });
      } catch (error) {
        throw new NotFoundException();
      }
    } else {
      try {
        const doctorEntity = await this.doctorRepository.findOneOrFail(
          doctor_id,
        );
        newAppointment = AppointmentEntity.create({
          date: date,
          newPatient: newPatient,
          doctor: doctorEntity,
          appointmentState: AppointmentState.TO_BE_STARTED,
        });
      } catch (error) {
        throw new NotFoundException(error);
      }
    }

    try {
      return await newAppointment.save();
    } catch (err) {
      if (err.code === '23502') {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async GetAll(): Promise<AppointmentEntity[]> {
    try {
      return await this.appointmentRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async GetByID(id: number): Promise<AppointmentEntity> {
    try {
      return await this.appointmentRepository.findOneOrFail(id, {
        relations: ['doctor', 'patient'],
      });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  public async GetCurrent(): Promise<AppointmentEntity[]> {
    try {
      return await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where(`DATE_TRUNC('day', "date") = DATE_TRUNC('day',now())`)
        .getMany();
    } catch (error) {
      throw new NotFoundException('no appointments found for today');
    }
  }

  public async DeleteOne(id: number): Promise<void> {
    try {
      const appointment = await this.appointmentRepository.findOneOrFail(id);
      await this.appointmentRepository.remove(appointment);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  public async UpdateOne(
    id: number,
    dto: UpdateAppointmentDTO,
  ): Promise<AppointmentEntity> {
    const { date, doctor_id, patient_id, appointmentState } = dto;
    let appointment: AppointmentEntity;
    let patientEntity: PatientEntity;
    let doctorEntity: DoctorEntity;
    try {
      appointment = await this.appointmentRepository.findOneOrFail(id, {
        relations: ['doctor', 'patient'],
      });

      if (patient_id) {
        patientEntity = await this.patientRepository.findOneOrFail(patient_id);
      }
      if (doctor_id) {
        doctorEntity = await this.doctorRepository.findOneOrFail(doctor_id);
      }
    } catch (error) {
      throw new NotFoundException();
    }

    if (date) {
      appointment.date = date;
    }
    if (appointmentState) {
      appointment.appointmentState = appointmentState;
    }

    appointment.doctor = doctorEntity;
    appointment.patient = patientEntity;

    try {
      return await appointment.save({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
