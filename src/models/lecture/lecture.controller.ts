import { Controller, Get } from '@nestjs/common';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /**
   * 학과 대학 조회
   * @returns findCollegeRes
   */
  @Get('find-college-depart')
  async findAllCollegeAndDepart(): Promise<any[]> {
    return await this.lectureService.findAllCollegeAndDepart();
  }

  @Get('find-depart')
  async findAllDepart(): Promise<any[]> {
    return await this.lectureService.findAllDepart();
  }

  /**
   * 강의 정보 조회
   * @returns Lecture
   */
  @Get('find-lecture')
  async findAllLecture(): Promise<any[]> {
    return await this.lectureService.findAllLecture();
  }
}
