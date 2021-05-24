import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DoctorController } from './doctor/doctor.controller';
import { PatientController } from './patient/patient.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { ApplicationModule } from '../modules/application.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { DoctorMapper } from './doctor/doctor.mapper';
import { PatientMapper } from './patient/patient.mapper';
import { AppointmentMapper } from './appointment/appointment.mapper';

@Module({
  controllers: [
    UserController,
    DoctorController,
    PatientController,
    AppointmentController,
    AuthController,
  ],
  imports: [ApplicationModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    DoctorMapper,
    PatientMapper,
    AppointmentMapper,
  ],
})
export class ApiModule {}
