import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsEmpty,
} from 'class-validator';

export class CardDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nickname: string;

  @IsString()
  @IsNotEmpty()
  flag: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNumber()
  @IsEmpty()
  limit: string;
}
