import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from 'src/modules/doctor/doctor.service';
import { Doctor } from 'src/models/IDoctor';
import { CreateDoctorDTO, GetDoctorDTO } from './doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorEntity } from 'src/repositories/doctor/doctor.entity';

@ApiTags('doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  public async Create(@Body() dto: CreateDoctorDTO): Promise<void> {
    await this.doctorService.Create(this.DTOtoDomainMapper(dto));
  }

  @Get()
  public async getAll(): Promise<GetDoctorDTO[]> {
    const result = await this.doctorService.GetAll();
    const mappedResult = this.DomainToDTOMapper(result);
    return mappedResult;
  }

  private DTOtoDomainMapper(dto): Doctor {
    const newDoctor: Doctor = dto;
    return newDoctor;
  }

  private DomainToDTOMapper(result: DoctorEntity[]): GetDoctorDTO[] {
    const mappedResult = result.map((item) => ({
      email: item.email,
      name: item.name,
      id: item.id,
    }));
    return mappedResult;
  }
}
