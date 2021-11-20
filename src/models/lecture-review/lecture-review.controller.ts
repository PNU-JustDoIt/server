import { Controller, Post, Body, Get } from '@nestjs/common';
import { LectureReviewService } from './lecture-review.service';
import { CreateLectureReviewReq } from './dtos/create-lecture-review.dto';
import { LectureReview } from './entities/lecture-review.entity';
import { LectureService } from '../lecture/lecture.service';

@Controller('lecture-review')
export class LectureReviewController {
  constructor(
    private readonly lectureReviewService: LectureReviewService,
    private readonly lectureService: LectureService,
  ) {}

  @Get('test')
  test() {
    return this.lectureService.findAll();
  }

  @Post('new-one')
  async createLectureReview(
    @Body() reviewData: CreateLectureReviewReq,
  ): Promise<LectureReview> {
    return this.lectureReviewService.createLectureReview(reviewData);
  }
}
