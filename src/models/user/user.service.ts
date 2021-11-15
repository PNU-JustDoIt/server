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
    const isEmailUsable: boolean = await this.userEmailDupCheck(
      userData.user_email,
    );

    const isNicknameUsable: boolean = await this.userNicknameDupCheck(
      userData.user_nickname,
    );

    if (isEmailUsable && isNicknameUsable) {
      // 중복된 user_email, user_nickname 이 존재하지 않는 경우 -> 생성
      try {
        const user = await this.userRepository.create({
          user_email: userData.user_email,
          user_nickname: userData.user_nickname,
          user_password: userData.user_password,
          user_phone: userData.user_phone,
        });

        const created_user = await this.userRepository.save(user);

        return created_user;
      } catch (err) {
        // 새로운 user 저장에 실패한 경우
        console.log('새로운 user 저장에 실패한 경우 err:', err);
        throw new Error(
          `[createLocalUser Error] create error by user_email: ${userData.user_email}`,
        );
      }
    } else {
      // 중복된 user_email 이 존재하는 경우
      console.log('중복된 user_email 또는 user_nickname 이 존재하는 경우 err');

      if (!isEmailUsable) {
        throw new Error(
          `[createLocalUser Error] users of duplicate user_email: ${userData.user_email}`,
        );
      }
      if (!isNicknameUsable) {
        throw new Error(
          `[createLocalUser Error] users of duplicate user_nickname: ${userData.user_nickname}`,
        );
      }
    }
  }

  /**
   * user_email 중복 여부 반환
   * @param user_email
   * @returns boolean;
   *  1. 중복 이메일인 경우 -> return false;
   *  2. 사용 가능한 이메일인 경우 -> return true;
   */
  async userEmailDupCheck(user_email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      user_email: user_email,
    });

    if (user && user !== null) return false;
    else return true;
  }

  /**
   * user_nickname 중복 여부 반환
   * @param user_nickname
   * @returns boolean;
   *  1. 중복 닉네임인 경우 -> return false;
   *  2. 사용 가능한 닉네임인 경우 -> return true;
   */
  async userNicknameDupCheck(user_nickname: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      user_nickname: user_nickname,
    });

    console.log(user_nickname);

    if (user && user !== null) return false;
    else return true;
  }

  async findUserIdByUserPhone(user_phone: string): Promise<string> {
    const user = await this.userRepository.findOne({
      user_phone: user_phone,
    });

    if (user && user !== null) return user.user_email;
    return null;
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
      console.log(res);
      return res;
    }

    return null;
  }
}
