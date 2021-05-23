import { Body, Controller, Get, Post } from '@nestjs/common';
import { PatientService } from 'src/modules/patient/patient.service';
import { Patient } from 'src/models/IPatient';
import { CreatePatientDTO, GetPatientDTO } from './patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatientEntity } from 'src/repositories/patient/patient.entity';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  public async createOne(@Body() dto: CreatePatientDTO): Promise<void> {
    await this.patientService.Create(this.DTOtoDomainMapper(dto));
  }

  @Get()
  public async getAll(): Promise<GetPatientDTO[]> {
    const result = await this.patientService.GetAll();
    const mappedResult = this.DomainToDTOMapper(result);
    return mappedResult;
  }

  private DTOtoDomainMapper(dto): Patient {
    const newPatient: Patient = dto;
    return newPatient;
  }

  private DomainToDTOMapper(result: PatientEntity[]): GetPatientDTO[] {
    const mappedResult = result.map((item) => ({
      email: item.email,
      name: item.name,
      birthDate: item.birthDate,
      id: item.id,
    }));
    return mappedResult;
  }
}
