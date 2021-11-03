import { GenderType } from '../constants/gender-type.type';

/**
 * @interface UserBase
 * user-entity base interface
 *
 * 1. userId: number
 * 2. email: string
 * 3. name: string
 * 4. nickName: string
 * 5. gender: GenderType (MALE | FEMALE)
 * 6. birthday: Date
 * 7. phone: string (010-1234-5678)
 *
 */
export interface UserBase {
  userId: number;
  email: string;
  name: string;
  nickName: string;
  gender: GenderType;
  birthday: Date;
  phone: string;
}
