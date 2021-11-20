import { IsEmail, IsString } from 'class-validator';

export class ChangeUserNicknameReq {
  @IsEmail()
  user_email: string;

  @IsString()
  new_nickname: string;
}
