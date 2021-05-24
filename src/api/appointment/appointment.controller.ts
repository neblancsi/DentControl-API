import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from 'src/modules/appointment/appointment.service';
import { CreateAppointmentDTO, GetAppointmentDTO } from './appointment.dto';
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
    await this.appointmentService.Create(this.mapper.DTOtoDomainMapper(dto));
  }

  @Get()
  public async getAll(): Promise<GetAppointmentDTO[]> {
    const result = await this.appointmentService.GetAll();
    const mappedResult = this.mapper.DomainToDTOMapper(result);
    return mappedResult;
  }
}
