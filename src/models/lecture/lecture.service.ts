import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { findCollegeRes } from './dto/findCollegeRes';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  async findAllCollegeAndDepart(): Promise<findCollegeRes[]> {
    const college: findCollegeRes[] = await this.lectureRepository
      .createQueryBuilder('lecture')
      .select('lecture.lecture_college_name')
      .groupBy('lecture.lecture_college_name')
      .getMany();

    return college;
  }

  async findAllDepart(): Promise<any[]> {
    const depart: any[] = await this.lectureRepository
      .createQueryBuilder('lecture')
      .select('lecture.lecture_department_name')
      .groupBy('lecture.lecture_department_name')
      .orderBy('binary(lecture.lecture_department_name)')
      .getMany();

    console.log('[findAllDepart] depart:', depart);

    return depart;
  }

  async findAllLecture(): Promise<any[]> {
    const Lecture: any[] = await this.lectureRepository
      .createQueryBuilder('lecture')
      .getMany();

    return Lecture;
  }

  async findOneById(id: number) {
    return this.lectureRepository.findOne(id);
  }

  async findAll() {
    return this.lectureRepository.find();
  }
}
