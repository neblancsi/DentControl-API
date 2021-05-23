import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../common/enums/user-roles.enum';

@Entity()
@Unique(['username', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: UserRole;

  async validatePassword(pw: string): Promise<boolean> {
    const hash = await bcrypt.hash(pw, this.salt);
    return hash === this.password;
  }
}
