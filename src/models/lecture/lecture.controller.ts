import { Body, Controller, Get } from '@nestjs/common';
import { findCollegeAndDepartRes } from './dto/findCollegeAndDepart';
import { findCollegeRes } from './dto/findCollegeRes';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /**
   * 학과 대학 조회
   * 
   * @returns findCollegeRes
   */
  @Get('find-college')
  async findAllCollege(): Promise<findCollegeRes[]> {
    return await this.lectureService.findAllCollege();
  }

  @Get('find-college-depart')
  async findCollegeAndDepart(): Promise<findCollegeAndDepartRes[]> {
    return await this.lectureService.findAllCollegeAndDepart();
  }
}
