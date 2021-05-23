import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/common/enums/user-roles.enum';
import { CreateUserDTO } from '../auth/auth.dto';

export class updateUserDTO extends PartialType(CreateUserDTO) {}

export class updateUserRoleDTO {
  @IsString()
  @MinLength(8)
  public readonly username: string;
  @IsEnum(UserRole)
  public readonly role: UserRole;
}
