import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces/IMapper';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';
import { GetAllAppointmentsDTO, GetAppointmentDTO } from './appointment.dto';

@Injectable()
export class AppointmentMapper implements IMapper {
  public DomainToDTOMapper(result: AppointmentEntity[]): GetAppointmentDTO[] {
    const mappedResult = result.map((item) => ({
      date: item.date,
      doctor: item.doctor,
      patient: item.patient,
      newPatient: item.newPatient,
      id: item.id,
    }));
    return mappedResult;
  }

  public DomainWithoutRelationsMapper(
    result: AppointmentEntity[],
  ): GetAllAppointmentsDTO[] {
    const mappedResult = result.map((item) => ({
      date: item.date,
      newPatient: item.newPatient,
      id: item.id,
    }));
    return mappedResult;
  }
}
