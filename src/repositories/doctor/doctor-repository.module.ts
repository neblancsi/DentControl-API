import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorRepository])],
  exports: [DoctorRepository],
  providers: [DoctorRepository],
})
export class DoctorRepositoryModule {}
