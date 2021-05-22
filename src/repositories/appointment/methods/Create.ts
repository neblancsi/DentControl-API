import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from 'src/models/IAppointment';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { PatientEntity } from 'src/repositories/patient/patient.entity';
import { AppointmentEntity } from '../appointment.entity';
import { AppointmentRepository } from '../appointment.repository';

export async function Create(
  this: AppointmentRepository,
  appointment: Appointment,
): Promise<void> {
  const { date, doctor_id, patient_id, newPatient } = appointment;

  let newAppointment;

  if (!newPatient) {
    const patientEntity = await PatientEntity.findOne(patient_id);

    const doctorEntity = await DoctorEntity.findOne(doctor_id);

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
    if (patient_id) {
      throw new BadRequestException();
    }
    const doctorEntity = await DoctorEntity.findOne(doctor_id);

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
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
