import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces/IMapper';
import { Appointment } from 'src/models/IAppointment';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';
import { GetAppointmentDTO } from './appointment.dto';

@Injectable()
export class AppointmentMapper implements IMapper {
  public DTOtoDomainMapper(dto): Appointment {
    const newAppointment: Appointment = dto;

    return newAppointment;
  }

  public DomainToDTOMapper(result: AppointmentEntity[]): GetAppointmentDTO[] {
    const mappedResult = result.map((item) => ({
      date: item.date,
      doctor: item.doctor_id,
      patient: item.patient_id,
      newPatient: item.newPatient,
      id: item.id,
    }));
    return mappedResult;
  }
}
