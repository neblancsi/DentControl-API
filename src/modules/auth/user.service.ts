import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO, CreateUserDTO } from 'src/api/auth/auth.dto';
import { UserRepository } from '../../repositories/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { updateUserRoleDTO } from 'src/api/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDTO): Promise<void> {
    return this.userRepository.createUser(user);
  }

  async logIn(user: AuthDTO): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(user);
    if (!username) {
      throw new UnauthorizedException('invalid credentials');
    } else {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
  }

  async updateRole(payload: updateUserRoleDTO): Promise<void> {
    return this.userRepository.updateRole(payload);
  }
}
