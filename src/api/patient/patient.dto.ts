import { IsEmail, IsInt, IsISO8601, IsString } from 'class-validator';

export class CreatePatientDTO {
  [x: string]: unknown;
  @IsString()
  public readonly name: string;
  @IsEmail()
  public readonly email: string;
  @IsISO8601()
  public readonly birthDate: Date;
}

export class GetPatientDTO extends CreatePatientDTO {
  @IsInt()
  public readonly id: number;
}
