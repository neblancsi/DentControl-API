import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserRepository],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [UserRepository],
})
export class UserPersistenceModule {}
