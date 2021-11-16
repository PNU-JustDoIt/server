import { IsEmail, IsString } from 'class-validator';

export class CreateUserReq {
  @IsEmail()
  user_email: string;

  @IsString()
  user_phone: string;

  @IsString()
  user_password: string;

  @IsString()
  user_nickname: string;
}
