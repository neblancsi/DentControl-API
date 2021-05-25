import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from 'src/modules/appointment/appointment.service';
import {
  CreateAppointmentDTO,
  GetAllAppointmentsDTO,
  GetAppointmentDTO,
} from './appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentValidationPipe } from 'src/common/pipes/appointmentValidation.pipe';
import { AppointmentMapper } from './appointment.mapper';

@ApiTags('appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly mapper: AppointmentMapper,
  ) {}

  @Post()
  public async Create(
    @Body(new AppointmentValidationPipe()) dto: CreateAppointmentDTO,
  ): Promise<void> {
    await this.appointmentService.Create(dto);
  }

  @Get()
  public async getAll(): Promise<GetAllAppointmentsDTO[]> {
    const result = await this.appointmentService.GetAll();
    const mappedResult = this.mapper.DomainWithoutRelationsMapper(result);
    return mappedResult;
  }

  @Get(':id')
  public async getByID(@Param('id') id: number): Promise<GetAppointmentDTO> {
    const result = await this.appointmentService.GetByID(id);
    const mappedResult = this.mapper.DomainToDTOMapper([result])[0];
    return mappedResult;
  }
}
