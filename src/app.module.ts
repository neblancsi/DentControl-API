import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ApplicationModule } from './modules/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRoot(),
    ApiModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
    ApplicationModule,
  ],
})
export class AppModule {}
