import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository])],
  exports: [PatientRepository],
  providers: [PatientRepository],
})
export class PatientRepositoryModule {}
