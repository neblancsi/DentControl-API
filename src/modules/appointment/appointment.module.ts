import { Module } from '@nestjs/common';
import { AppointmentRepositoryModule } from 'src/repositories/appointment/appointment-repository.module';
import { AppointmentService } from './appointment.service';

@Module({
  providers: [AppointmentService],
  exports: [AppointmentService],
  imports: [AppointmentRepositoryModule],
})
export class AppointmentModule {}
