import { Test, TestingModule } from '@nestjs/testing';
import { NaverSensService } from './naver-sens.service';

describe('NaverSensService', () => {
  let service: NaverSensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaverSensService],
    }).compile();

    service = module.get<NaverSensService>(NaverSensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
