import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/repositories/persistence.module';
import { DoctorService } from './doctor.service';

@Module({
  providers: [DoctorService],
  imports: [PersistenceModule],
  exports: [DoctorService],
})
export class DoctorModule {}
