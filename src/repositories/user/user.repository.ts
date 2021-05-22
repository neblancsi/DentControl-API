import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthDTO, CreateUserDTO } from 'src/api/auth/auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-roles.enum';
import { updateUserRoleDTO } from 'src/api/user/user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async createUser(user: CreateUserDTO): Promise<void> {
    const { name, username, password, email } = user;

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.name = name;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);
    newUser.role = UserRole.USER;

    try {
      await newUser.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }

  public async validateUserPassword(authDTO: AuthDTO): Promise<string> {
    const { username, password } = authDTO;
    const user = await UserEntity.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  public async findOne(payload): Promise<UserEntity> {
    const username = payload;
    const user = await UserEntity.findOne({ username });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  public async updateRole(payload: updateUserRoleDTO): Promise<void> {
    const { username, role } = payload;

    const result = await UserEntity.update({ username }, { role });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  private async hashPassword(pw: string, salt: string): Promise<string> {
    return bcrypt.hash(pw, salt);
  }
}
