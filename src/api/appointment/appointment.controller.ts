import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentService } from 'src/modules/appointment/appointment.service';
import {
  CreateAppointmentDTO,
  GetAllAppointmentsDTO,
  GetAppointmentDTO,
  UpdateAppointmentDTO,
} from './appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentValidationPipe } from 'src/common/pipes/appointmentValidation.pipe';
import { AppointmentMapper } from './appointment.mapper';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';

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
  ): Promise<AppointmentEntity> {
    return await this.appointmentService.Create(dto);
  }

  @Get()
  public async getAll(): Promise<GetAllAppointmentsDTO[]> {
    const result = await this.appointmentService.GetAll();
    const mappedResult = this.mapper.DomainWithoutRelationsMapper(result);
    return mappedResult;
  }

  @Get('id/:id')
  public async getByID(@Param('id') id: number): Promise<GetAppointmentDTO> {
    const result = await this.appointmentService.GetByID(id);
    const mappedResult = this.mapper.DomainToDTOMapper([result])[0];
    return mappedResult;
  }

  @Get('/current')
  public async getCurrent(): Promise<GetAppointmentDTO[]> {
    const result = await this.appointmentService.GetCurrent();
    console.log(result);
    const mappedResult = this.mapper.DomainToDTOMapper(result);
    return mappedResult;
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteOne(@Param('id') id: number): Promise<void> {
    await this.appointmentService.DeleteOne(id);
  }

  @Put(':id')
  public async updateOne(
    @Param('id') id: number,
    @Body() dto: UpdateAppointmentDTO,
  ): Promise<AppointmentEntity> {
    return await this.appointmentService.UpdateOne(id, dto);
  }
}
