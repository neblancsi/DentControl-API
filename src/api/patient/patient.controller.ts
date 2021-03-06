import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { PatientService } from 'src/modules/patient/patient.service';
import { CreatePatientDTO, GetPatientDTO } from './patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatientMapper } from './patient.mapper';
import { PatientEntity } from 'src/repositories/patient/patient.entity';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly mapper: PatientMapper,
  ) {}

  @Post()
  public async createOne(
    @Body() dto: CreatePatientDTO,
  ): Promise<PatientEntity> {
    return await this.patientService.Create(dto);
  }

  @Get()
  public async getAll(): Promise<GetPatientDTO[]> {
    const result = await this.patientService.GetAll();
    const mappedResult = this.mapper.DomainToDTOMapper(result);
    return mappedResult;
  }

  @Get(':id')
  public async getByID(@Param('id') id: number): Promise<GetPatientDTO> {
    const result = await this.patientService.GetByID(id);
    const mappedResult = this.mapper.DomainToDTOMapper([result])[0];
    return mappedResult;
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteOne(@Param('id') id: number): Promise<void> {
    await this.patientService.DeleteOne(id);
  }
}
