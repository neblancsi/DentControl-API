import { Body, Controller, Post } from '@nestjs/common';
import { PatientService } from 'src/modules/patient/patient.service';
import { Patient } from 'src/models/IPatient';
import { CreatePatientDTO } from './patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  public async Create(@Body() dto: CreatePatientDTO): Promise<void> {
    await this.patientService.Create(this.mapper(dto));
  }

  private mapper(dto): Patient {
    const newPatient: Patient = dto;
    return newPatient;
  }
}
