import { Module } from '@nestjs/common';
import { PatientRepositoryModule } from 'src/repositories/patient/patient-repository.module';
import { PatientService } from './patient.service';

@Module({
  imports: [PatientRepositoryModule],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
