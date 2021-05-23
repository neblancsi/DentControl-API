import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-roles.enum';
import { updateUserRoleDTO } from './user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}
  //get user by id
  //get all users

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  updateUserRole(@Body() payload: updateUserRoleDTO): Promise<void> {
    return this.authService.updateRole(payload);
  }
}
