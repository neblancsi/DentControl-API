import { Module } from '@nestjs/common';
import { DoctorRepositoryModule } from 'src/repositories/doctor/doctor-repository.module';
import { DoctorService } from './doctor.service';

@Module({
  providers: [DoctorService],
  imports: [DoctorRepositoryModule],
  exports: [DoctorService],
})
export class DoctorModule {}
