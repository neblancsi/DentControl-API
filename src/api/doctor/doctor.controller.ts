import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { DoctorService } from 'src/modules/doctor/doctor.service';
import { CreateDoctorDTO, GetDoctorDTO } from './doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorMapper } from './doctor.mapper';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';

@ApiTags('doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly mapper: DoctorMapper,
  ) {}

  @Post()
  public async Create(@Body() dto: CreateDoctorDTO): Promise<DoctorEntity> {
    return await this.doctorService.Create(dto);
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

  @Delete(':id')
  @HttpCode(204)
  public async deleteOne(@Param('id') id: number): Promise<void> {
    await this.doctorService.DeleteOne(id);
  }
}
