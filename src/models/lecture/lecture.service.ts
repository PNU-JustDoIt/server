import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  async findOneById(id: number) {
    const result = await this.lectureRepository.find();
    console.log('find lecture', result);
    return result[0];
  }

  async findAll() {
    return this.lectureRepository.find();
  }
}
