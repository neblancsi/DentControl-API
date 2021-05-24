import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from 'src/modules/doctor/doctor.service';
import { CreateDoctorDTO, GetDoctorDTO } from './doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorMapper } from './doctor.mapper';

@ApiTags('doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly mapper: DoctorMapper,
  ) {}

  @Post()
  public async Create(@Body() dto: CreateDoctorDTO): Promise<void> {
    await this.doctorService.Create(this.mapper.DTOtoDomainMapper(dto));
  }

  @Get()
  public async getAll(): Promise<GetDoctorDTO[]> {
    const result = await this.doctorService.GetAll();
    const mappedResult = this.mapper.DomainToDTOMapper(result);
    return mappedResult;
  }
}
