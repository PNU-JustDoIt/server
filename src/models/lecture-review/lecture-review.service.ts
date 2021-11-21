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
  async findByDepartmentName(name: string) {
    const result = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .leftJoinAndSelect('lecture-review.lecture_id', 'lecture_id')
      .where('lecture_id.lecture_department_name = :name', { name })
      .getMany();
    return result;
  }
  async findByLectureCategory(name: string) {
    //const name='일반선택';
    const result = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .leftJoinAndSelect('lecture-review.lecture_id', 'lecture_id')
      .where('lecture_id.lecature_category = :name', {name })
      .getMany();
    return result;
  }

  async findByLectureLiberal(name: string) {
    const result = await this.lectureReviewRepository
      .createQueryBuilder('lecture-review')
      .leftJoinAndSelect('lecture-review.lecture_id', 'lecture_id')
      .where('lecture_id.lecture_liberal_category = :name', {name})
      .getMany();
  }
}
