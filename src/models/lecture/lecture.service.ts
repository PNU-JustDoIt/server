import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { findCollegeAndDepartRes } from './dto/findCollegeAndDepart';
import { findCollegeRes } from './dto/findCollegeRes';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}
  async findAllCollege(): Promise<findCollegeRes[]> {
    const college: findCollegeRes[] = await this.lectureRepository
        .createQueryBuilder('lecture')
        .select('lecture_college_name')
        .getMany();

    return college;
  }

  async findAllCollegeAndDepart(): Promise<findCollegeAndDepartRes[]> {
    const collegeAndDepart : findCollegeAndDepartRes[]= await this.lectureRepository
        .createQueryBuilder('lecture')
        .select('lecture_depart_name','lecture_college_name')
        .getMany();

    return collegeAndDepart;
  }
  async findAllLecture(): Promise<Lecture[]> {
    const Lecture: Lecture[] = await this.lectureRepository
      .createQueryBuilder('lecture')
      .getMany();
    return Lecture;
  }
}
