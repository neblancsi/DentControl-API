import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentService } from 'src/modules/appointment/appointment.service';
import { Appointment } from 'src/models/IAppointment';
import { CreateAppointmentDTO } from './appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentValidationPipe } from 'src/common/pipes/appointmentValidation.pipe';

@ApiTags('appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  public async Create(
    @Body(new AppointmentValidationPipe()) dto: CreateAppointmentDTO,
  ): Promise<void> {
    await this.appointmentService.Create(this.mapper(dto));
  }

  private mapper(dto): Appointment {
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
}
