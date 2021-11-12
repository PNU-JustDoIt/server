import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserReq } from './dto/create-user-req.dto';
import { CreateUserRes } from './dto/create-user-res.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Local User 생성
   * @param userData
   * @returns CreateUserRes
   */
  @Post('create-local-user')
  async createLocalUser(
    @Body() userData: CreateUserReq,
  ): Promise<CreateUserRes> {
    return await this.userService.createLocalUser(userData);
  }

  /**
   * user_email 중복 여부 반환
   * @param user_email
   * @returns boolean;
   *  1. 중복 이메일인 경우 -> return false;
   *  2. 사용 가능한 이메일인 경우 -> return true;
   */
  @Post('email-dup-check')
  async userEmailDupCheck(
    @Body('user_email') user_email: string,
  ): Promise<boolean> {
    return await this.userService.userEmailDupCheck(user_email);
  }

  /**
   * user_nickname 중복 여부 반환
   * @param user_nickname
   * @returns boolean;
   *  1. 중복 닉네임인 경우 -> return false;
   *  2. 사용 가능한 닉네임인 경우 -> return true;
   */
  @Post('nickname-dup-check')
  async userNicknameDupCheck(
    @Body('user_nickname') user_nickname: string,
  ): Promise<boolean> {
    return await this.userService.userNicknameDupCheck(user_nickname);
  }

  @Get('find-userid-by-userphone/:user_phone')
  async findUserIdByUserPhone(
    @Param('user_phone') user_phone: string,
  ): Promise<string> {
    return await this.userService.findUserIdByUserPhone(user_phone);
  }
}
