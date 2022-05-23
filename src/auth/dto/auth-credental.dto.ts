import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentalDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
