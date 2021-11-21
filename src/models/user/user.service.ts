import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectureReview } from '../lecture-review/entities/lecture-review.entity';
import { Lecture } from '../lecture/entities/lecture.entity';
import { ChangeUserNicknameReq } from './dto/change-user-nickname-req.dto';
import { ChangeUserPasswordReq } from './dto/change-user-password-req.dto';
import { CreateUserReq } from './dto/create-user-req.dto';
import { CreateUserRes } from './dto/create-user-res.dto';
import { DeleteUserRes } from './dto/delete-user-res.dto';
import { MyReviewRes } from './dto/my-review-res.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(LectureReview)
    private readonly lecture: Repository<Lecture>,

    @InjectRepository(LectureReview)
    private readonly lectureReviewRepository: Repository<LectureReview>,
  ) {}

  /**
   * 나의 후기 전체 조회
   * @param user_id
   * @returns MyReviewRes[]
   */
  async getMyReview(user_id: number): Promise<MyReviewRes[]> {
    const rawMyReviewList = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .leftJoinAndSelect('lecture-review.user_id', 'user')
      .leftJoinAndSelect('lecture-review.lecture_id', 'lecture')
      .where('lecture-review.user_id.user_id=:user_id', { user_id: user_id })
      .getMany();

    const myReviewList: MyReviewRes[] = rawMyReviewList.map((each) => {
      return {
        review_id: each.review_id,
        lecture_name: each.lecture_id.lecture_name,
        professor_name: each.lecture_id.lecture_professor_name,
        lecture_category: each.lecture_id.lecature_category,
        lecture_grade: each.lecture_id.lecture_grade,
        lecture_theory: each.lecture_id.lecture_theory,
        lecture_training: each.lecture_id.lecture_training,
        review_is_report: each.review_is_report,
        review_is_team_project: each.review_is_team_project,
        review_main_test_count: each.review_main_test_count,
        review_sub_test_count: each.review_sub_test_count,
        review_test_category: each.review_test_category,
        review_description: each.review_description,
        review_difficulty: each.review_difficulty,
        review_using_books: each.review_using_books,
      };
    });

    return myReviewList;
  }

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
   * Local User 삭제
   * @param user_email
   * @returns DeleteUserRes
   */
  async deleteLocalUser(user_email: string): Promise<DeleteUserRes> {
    const user = await this.userRepository.findOne({ user_email: user_email });

    if (user && user !== null) {
      try {
        const { user_password, ...res } = await this.userRepository.remove(
          user,
        );
        return res;
      } catch (err) {
        throw new Error('[deleteLocalUser Error] deletion error');
      }
    } else {
      throw new Error(
        `[deleteLocalUser Error] no user was found by user_email: ${user_email}`,
      );
    }
  }

  async changeUserPassword(userData: ChangeUserPasswordReq): Promise<boolean> {
    const { current_password, new_password, user_email } = userData;

    const user = await this.userRepository.findOne({ user_email: user_email });

    if (user && user.user_password === current_password) {
      try {
        await this.userRepository
          .createQueryBuilder('user')
          .update(User)
          .where('user.user_email=:user_email', {
            user_email: user_email,
          })
          .set({
            ...user,
            user_password: new_password,
          })
          .execute();
      } catch {
        throw new Error(
          `[changeUserPassword Error] change user_password error by user_email: ${user_email}`,
        );
      }
    } else {
      throw new Error(
        `[changeUserPassword Error] user_password does not match.`,
      );
    }

    return true;
  }

  async changeUserNickname(userData: ChangeUserNicknameReq): Promise<boolean> {
    const { user_email, new_nickname } = userData;

    const user = await this.userRepository.findOne({ user_email: user_email });
    const isUsable = await this.userNicknameDupCheck(new_nickname);

    if (user && isUsable) {
      try {
        await this.userRepository
          .createQueryBuilder('user')
          .update(User)
          .where('user.user_email=:user_email', {
            user_email: user_email,
          })
          .set({
            ...user,
            user_nickname: new_nickname,
          })
          .execute();
      } catch {
        throw new Error(
          `[changeUserNickname Error] change user_nickname error by user_email: ${user_email}`,
        );
      }
    } else {
      throw new Error(
        `[changeUserPassword Error] user_nickname: ${new_nickname} already in use.`,
      );
    }

    return true;
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

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
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
