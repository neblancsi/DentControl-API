import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/repositories/persistence.module';
import { PatientService } from './patient.service';

@Module({
  imports: [PersistenceModule],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
