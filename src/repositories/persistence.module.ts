import { Module } from '@nestjs/common';
import { AppointmentRepositoryModule } from './appointment/appointment-repository.module';
import { DoctorRepositoryModule } from './doctor/doctor-repository.module';
import { PatientRepositoryModule } from './patient/patient-repository.module';

@Module({
  imports: [
    PatientRepositoryModule,
    DoctorRepositoryModule,
    AppointmentRepositoryModule,
  ],
  exports: [
    PatientRepositoryModule,
    DoctorRepositoryModule,
    AppointmentRepositoryModule,
  ],
})
export class PersistenceModule {}
