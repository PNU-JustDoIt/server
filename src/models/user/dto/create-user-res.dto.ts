import { GenderType } from '../constants/gender-type.type';

export class CreateUserRes {
  user_id: number;
  user_email: string;
  user_name: string;
  user_nickname: string;
  user_gender: GenderType;
  user_birthday: Date;
  user_phone: string;
}
