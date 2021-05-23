import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from 'src/modules/appointment/appointment.service';
import { Appointment } from 'src/models/IAppointment';
import { CreateAppointmentDTO, GetAppointmentDTO } from './appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentValidationPipe } from 'src/common/pipes/appointmentValidation.pipe';
import { AppointmentEntity } from 'src/repositories/appointment/appointment.entity';

@ApiTags('appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  public async Create(
    @Body(new AppointmentValidationPipe()) dto: CreateAppointmentDTO,
  ): Promise<void> {
    await this.appointmentService.Create(this.DTOtoDomainMapper(dto));
  }

  @Get()
  public async getAll(): Promise<GetAppointmentDTO[]> {
    const result = await this.appointmentService.GetAll();
    const mappedResult = this.DomainToDTOMapper(result);
    return mappedResult;
  }

  private DTOtoDomainMapper(dto): Appointment {
    const newPatientBool = (() => {
      if (dto.newPatient == true) {
        return true;
      } else {
        return false;
      }
    })();
    const newAppointment: Appointment = {
      date: dto.date,
      doctor_id: dto.doctor,
      patient_id: dto.patient,
      newPatient: newPatientBool,
    };

    return newAppointment;
  }

  private DomainToDTOMapper(result: AppointmentEntity[]): GetAppointmentDTO[] {
    const mappedResult = result.map((item) => ({
      date: item.date,
      doctor: item.doctor_id,
      patient: item.patient_id,
      newPatient: item.newPatient,
      id: item.id,
    }));
    return mappedResult;
  }
}
