import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserReq } from './dto/create-user-req.dto';
import { CreateUserRes } from './dto/create-user-res.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Local User 생성
   * @param userData
   * @returns CreateUserRes
   */
  async createLocalUser(userData: CreateUserReq): Promise<CreateUserRes> {
    const isDup: CreateUserRes | null = await this.findUserByEmail(
      userData.user_email,
    );

    if (!isDup) {
      // 중복된 user_email 이 존재하지 않는 경우 -> 생성
      try {
        const user = await this.userRepository.create({
          user_email: userData.user_email,
          user_nickname: userData.user_nickname,
          user_password: userData.user_password,
          user_phone: userData.user_phone,
        });

        const created_user = await this.userRepository.save(user);

        return created_user;
      } catch (e) {
        // 새로운 user 저장에 실패한 경우
        throw new Error(
          `[createLocalUser Error] create error by user_email: ${userData.user_email}`,
        );
      }
    } else {
      // 중복된 user_email 이 존재하는 경우
      throw new Error(
        `[createLocalUser Error] users of duplicate user_email: ${userData.user_email}`,
      );
    }
  }

  /**
   * user_email 을 통한 User 조회
   * @param user_email
   * @returns CreateUserRes | null
   *    1. user_email 에 해당하는 User 가 존재하는 경우 -> return CreateUserRes
   *    2. user_email 에 해당하는 User 가 존재하지 않는 경우 -> return null
   */
  private async findUserByEmail(
    user_email: string,
  ): Promise<CreateUserRes | null> {
    const user = await this.userRepository.findOne({ user_email: user_email });

    if (user) {
      const { user_password, ...res } = user;
      return res;
    }

    return null;
  }
}
