export class AuthDTO {
  public readonly username: string;
  public readonly password: string;
}

export class CreateUserDTO extends AuthDTO {
  public readonly email: string;
  public readonly name: string;
}

//TODO validation
