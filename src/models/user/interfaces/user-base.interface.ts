import { GenderType } from '../constants/gender-type.type';

/**
 * @interface UserBase
 * user-entity base interface
 *
 * 1. user_id: number
 * 2. user_email: string
 * 3. user_password: string;
 * 4. user_name: string
 * 5. user_nickname: string
 * 6. user_gender: GenderType (MALE | FEMALE)
 * 7. user_birthday: Date
 * 8. user_phone: string (010-1234-5678)
 *
 */
export interface UserBase {
  user_id: number;
  user_email: string;
  user_password: string;
  user_name: string;
  user_nickname: string;
  user_gender: GenderType;
  user_birthday: Date;
  user_phone: string;
}
