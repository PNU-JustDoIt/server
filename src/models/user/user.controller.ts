import { Body, Controller, Post } from '@nestjs/common';
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
}
