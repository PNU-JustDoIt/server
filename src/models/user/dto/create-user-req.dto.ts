import { IsEmail, IsString } from 'class-validator';
import { GenderType } from '../constants/gender-type.type';

export class CreateUserReq {
  @IsEmail()
  user_email: string;

  @IsString()
  user_password: string;

  @IsString()
  user_name: string;

  @IsString()
  user_nickname: string;

  @IsString()
  user_gender: GenderType;

  @IsString()
  user_birthday: Date;

  @IsString()
  user_phone: string;
}
