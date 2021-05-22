import { Injectable } from '@nestjs/common';

import { Create } from './methods/Create';
import { IAppointmentRepository } from 'src/modules/appointment/IAppointmentRepository';
import { EntityRepository, Repository } from 'typeorm';

import { AppointmentEntity } from './appointment.entity';

@Injectable()
@EntityRepository(AppointmentEntity)
export class AppointmentRepository
  extends Repository<AppointmentEntity>
  implements IAppointmentRepository {
  public Create = Create;
}
