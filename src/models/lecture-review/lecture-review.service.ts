import { CertifiedImageService } from './../certified-image/certified-image.service';
import { LectureService } from './../lecture/lecture.service';
import { UserService } from './../user/user.service';
import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLectureReviewReq } from './dto/create-lecture-review.dto';
import { LectureReview } from './entities/lecture-review.entity';

import { FindLectureReviewDetail } from './dto/find-lecture-review-detail.dto';

@Injectable()
export class LectureReviewService {
  constructor(
    @InjectRepository(LectureReview)
    private readonly lectureReviewRepository: Repository<LectureReview>,

    private readonly userService: UserService,
    private readonly lectureService: LectureService,
    private readonly certifiedImageService: CertifiedImageService,
  ) {}

  async createLectureReview(
    reviewData: CreateLectureReviewReq,
  ): Promise<LectureReview> {
    const lectureReview = new LectureReview();

    lectureReview.lecture_id = await this.lectureService.findOneById(
      reviewData.lecture_id,
    );
    lectureReview.user_id = await this.userService.findOneById(
      reviewData.user_id,
    );

    if (!lectureReview.lecture_id || !lectureReview.user_id) {
      throw new HttpException(
        '[createLectureReview Error] review 에 관계 설정 할 lecture 정보가 잘못되었거나 user 정보가 잘못됨.',
        500,
      );
    }

    try {
      lectureReview.certifiedImage =
        await this.certifiedImageService.createCertifiedImage({
          certified_image_url: reviewData.certified_image_url,
        });
    } catch {
      throw new HttpException(
        '[createLectureReview Error] review 에 대해 적절한 certified-image 가 생성되지 않음.',
        500,
      );
    }

    lectureReview.review_description = reviewData.review_description;
    lectureReview.review_using_books = reviewData.review_using_books;
    lectureReview.review_difficulty = reviewData.review_difficulty;
    lectureReview.review_is_report = reviewData.review_is_report;
    lectureReview.review_is_team_project = reviewData.review_is_team_project;
    lectureReview.review_main_test_count = reviewData.review_main_test_count;
    lectureReview.review_sub_test_count = reviewData.review_sub_test_count;
    lectureReview.review_test_category = reviewData.review_test_category;

    try {
      return this.lectureReviewRepository.save(lectureReview);
    } catch {
      throw new HttpException(
        '[createLectureReview Error] lecture-review 생성에 실패함.',
        500,
      );
    }
  }

  async lectureReviewFindOne(id: number): Promise<FindLectureReviewDetail> {
    const result = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .leftJoinAndSelect('lecture-review.lecture_id', 'lecture_id')
      .leftJoinAndSelect('lecture-review.certifiedImage', 'certifiedImage')
      .where('lecture-review.review_id = :id', { id })
      .getOne();

    return result;
  }

  /**
   * 리뷰 단건 삭제
   * @param user_id
   * @param review_id
   * @returns
   */
  async deleteMyReviewByUserIdAndReviewId(
    user_id: number,
    review_id: number,
  ): Promise<any> {
    console.log('user_id:', user_id);
    console.log('review_id:', review_id);

    const rawReview = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .where('lecture-review.user_id.user_id=:user_id', { user_id: user_id })
      .where('lecture-review.review_id=:review_id', { review_id: review_id })
      .getOne();

    if (!rawReview) {
      throw new Error(
        `[deleteMyReviewByUserIdAndReviewId] There is no review with user_id ${user_id} and review_id ${review_id}.`,
      );
    } else {
      try {
        return await this.lectureReviewRepository.delete(rawReview);
      } catch {
        throw new Error(
          `[deleteMyReviewByUserIdAndReviewId] Failed to delete a review with user_id of ${user_id} and review_id of ${review_id}.`,
        );
      }
    }
  }

  async getReviews(): Promise<any> {
    const rawReviews = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .select()
      .getMany();

    return rawReviews;
  }
}
