import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [PatientModule, DoctorModule, AppointmentModule],
  exports: [PatientModule, DoctorModule, AppointmentModule],
})
export class ApplicationModule {}
