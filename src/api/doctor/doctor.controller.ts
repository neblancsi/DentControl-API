import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from 'src/modules/doctor/doctor.service';
import { Doctor } from 'src/models/IDoctor';
import { CreateDoctorDTO } from './doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('doctor')
@ApiBearerAuth()
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  public async Create(@Body() dto: CreateDoctorDTO): Promise<void> {
    await this.doctorService.Create(this.mapper(dto));
  }

  private mapper(dto): Doctor {
    const newDoctor: Doctor = dto;
    return newDoctor;
  }
}
