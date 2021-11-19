import { Controller, Post, Body } from '@nestjs/common';
import { LectureReviewService } from './lecture-review.service';
import { CreateLectureReviewReq } from './dtos/create-lecture-review.dto';
import { LectureReview } from './entities/lecture-review.entity';

@Controller('lecture-review')
export class LectureReviewController {
  constructor(private readonly lectureReviewService: LectureReviewService) {}

  @Post('new-one')
  async createLectureReview(
    @Body() reviewData: CreateLectureReviewReq,
  ): Promise<LectureReview> {
    return this.lectureReviewService.createLectureReview(reviewData);
  }
}
