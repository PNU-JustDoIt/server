import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LectureReviewService } from './lecture-review.service';
import { CreateLectureReviewReq } from './dto/create-lecture-review.dto';
import { LectureReview } from './entities/lecture-review.entity';

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

  /**
   * 리뷰 단건 삭제
   * @param user_id
   * @param review_id
   * @returns
   */
  @Delete('delete-review/:user_id/:review_id')
  async deleteMyReviewByUserIdAndReviewId(
    @Query('user_id') user_id: number,
    @Query('review_id') review_id: number,
  ): Promise<any> {
    return await this.lectureReviewService.deleteMyReviewByUserIdAndReviewId(
      user_id,
      review_id,
    );
  }

  @Post('get-reviews')
  async getReviews(): Promise<any> {
    console.log('adsfasdf1');
    return await this.lectureReviewService.getReviews();
  }
}
