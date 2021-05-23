import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateDoctorDTO {
  @IsString()
  public readonly name: string;
  @IsEmail()
  public readonly email: string;
}

export class GetDoctorDTO extends CreateDoctorDTO {
  @IsInt()
  public readonly id: number;
}
