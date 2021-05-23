import { IsEmail, IsString } from 'class-validator';

export class CreateDoctorDTO {
  @IsString()
  public readonly name: string;
  @IsEmail()
  public readonly email: string;
}
