import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRepository])],
  exports: [AppointmentRepository],
  providers: [AppointmentRepository],
})
export class AppointmentRepositoryModule {}
