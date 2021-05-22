import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ApplicationModule } from './modules/application.module';
import { PersistenceModule } from './repositories/persistence.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('host'),
        username: configService.get('username'),
        password: configService.get('db_password'),
        database: configService.get('database'),
        port: configService.get('port'),
        entities: configService.get('entities'),
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ApiModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
    ApplicationModule,
    PersistenceModule,
  ],
})
export class AppModule {}
