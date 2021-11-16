/**
 * @interface UserBase
 * user-entity base interface
 *
 * 1. user_id: number
 * 2. user_email: string
 * 3. user_password: string;
 * 4. user_nickname: string
 * 5. user_phone: string (010-1234-5678)
 *
 */
export interface UserBase {
  user_id: number;
  user_email: string;
  user_password: string;
  user_nickname: string;
  user_phone: string;
}
