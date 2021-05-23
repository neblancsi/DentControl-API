import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDTO {
  @IsString()
  @MinLength(8)
  public readonly username: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class CreateUserDTO extends AuthDTO {
  @IsEmail()
  public readonly email: string;
  @IsString()
  public readonly name: string;
}
