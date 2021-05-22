import { UserRole } from 'src/repositories/user/user-roles.enum';

export class updateUserRoleDTO {
  public readonly username: string;
  public readonly role: UserRole;
}

//TODO validation
