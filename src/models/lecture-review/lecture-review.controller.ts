import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LectureReviewService } from './lecture-review.service';
import { CreateLectureReviewReq } from './dto/create-lecture-review.dto';
import { LectureReview } from './entities/lecture-review.entity';
import { LectureService } from '../lecture/lecture.service';

@Controller('lecture-review')
export class LectureReviewController {
  constructor(private readonly lectureReviewService: LectureReviewService) {}

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.lectureReviewService.lectureReviewFindOne(id);
  }

  @Post('new-one')
  async createLectureReview(
    @Body() reviewData: CreateLectureReviewReq,
  ): Promise<LectureReview> {
    return this.lectureReviewService.createLectureReview(reviewData);
  }
}
