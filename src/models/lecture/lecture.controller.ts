import { Body, Controller, Get } from '@nestjs/common';
import { findCollegeAndDepartRes } from './dto/findCollegeAndDepart';
import { findCollegeRes } from './dto/findCollegeRes';
import { Lecture } from './entities/lecture.entity';
import { LectureBase } from './interfaces/lectureBase.interface';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get('test')
  async test(): Promise<any> {
    return await this.lectureService.test();
  }
  /**
   * 학과 대학 조회
   * 
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
   * 
   * @returns Lecture
   */
  @Get('find-lecture')
  async findAllLecture(): Promise<any[]>{
    return await this.lectureService.findAllLecture();
  }
}
