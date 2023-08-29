import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  job: string;
}
