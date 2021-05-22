import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/user.service';
import { Public } from 'src/modules/auth/public.decorator';
import { AuthDTO, CreateUserDTO } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  signUp(@Body() user: CreateUserDTO) {
    return this.authService.signUp(user);
  }

  @Public()
  @Post('/login')
  logIn(@Body() user: AuthDTO): Promise<{ accessToken: string }> {
    return this.authService.logIn(user);
  }
}
