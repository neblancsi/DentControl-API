import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/repositories/persistence.module';
import { AppointmentService } from './appointment.service';

@Module({
  providers: [AppointmentService],
  exports: [AppointmentService],
  imports: [PersistenceModule],
})
export class AppointmentModule {}
