import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    await this.doctorService.Create(dto);
  }

  @Get()
  public async getAll(): Promise<GetDoctorDTO[]> {
    const result = await this.doctorService.GetAll();
    const mappedResult = this.mapper.DomainToDTOMapper(result);
    return mappedResult;
  }

  @Get(':id')
  public async getByID(@Param('id') id: number): Promise<GetDoctorDTO> {
    const result = await this.doctorService.GetByID(id);
    const mappedResult = this.mapper.DomainToDTOMapper([result])[0];
    return mappedResult;
  }
}
