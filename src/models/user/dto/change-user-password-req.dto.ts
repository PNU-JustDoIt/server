import { IsEmail, IsString } from 'class-validator';

export class ChangeUserPasswordReq {
  @IsEmail()
  user_email: string;

  @IsString()
  current_password: string;

  @IsString()
  new_password: string;
}
