import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces/IMapper';
import { Doctor } from 'src/models/IDoctor';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';
import { GetDoctorDTO } from './doctor.dto';

@Injectable()
export class DoctorMapper implements IMapper {
  public DTOtoDomainMapper(dto): Doctor {
    const newDoctor: Doctor = dto;
    return newDoctor;
  }

  public DomainToDTOMapper(result: DoctorEntity[]): GetDoctorDTO[] {
    const mappedResult = result.map((item) => ({
      email: item.email,
      name: item.name,
      id: item.id,
    }));

    return mappedResult;
  }
}
