import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces/IMapper';
import { PatientEntity } from 'src/repositories/patient/patient.entity';
import { GetPatientDTO } from './patient.dto';

@Injectable()
export class PatientMapper implements IMapper {
  public DomainToDTOMapper(result: PatientEntity[]): GetPatientDTO[] {
    const mappedResult = result.map((item) => ({
      email: item.email,
      name: item.name,
      birthDate: item.birthDate,
      id: item.id,
    }));
    return mappedResult;
  }
}
