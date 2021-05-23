import { IsDate, IsEmail, IsISO8601, IsString } from 'class-validator';

export class CreatePatientDTO {
  @IsString()
  public readonly name: string;
  @IsEmail()
  public readonly email: string;
  @IsISO8601()
  public readonly birthDate: Date;
}
