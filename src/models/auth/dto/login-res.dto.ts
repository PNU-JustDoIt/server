import { UserRes } from './user-res.dto';

export class LoginRes {
  access_token: string;
  user: UserRes;
}
