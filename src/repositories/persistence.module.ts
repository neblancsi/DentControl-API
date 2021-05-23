import { Module } from '@nestjs/common';
import { AppointmentRepositoryModule } from './appointment/appointment-repository.module';
import { DoctorRepositoryModule } from './doctor/doctor-repository.module';
import { PatientRepositoryModule } from './patient/patient-repository.module';
import { UserPersistenceModule } from './user/user-persistence.module';

@Module({
  imports: [
    PatientRepositoryModule,
    DoctorRepositoryModule,
    AppointmentRepositoryModule,
    UserPersistenceModule,
  ],
  exports: [
    PatientRepositoryModule,
    DoctorRepositoryModule,
    AppointmentRepositoryModule,
    UserPersistenceModule,
  ],
})
export class PersistenceModule {}
