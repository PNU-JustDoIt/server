import { Test, TestingModule } from '@nestjs/testing';
import { NaverSensController } from './naver-sens.controller';

describe('NaverSensController', () => {
  let controller: NaverSensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NaverSensController],
    }).compile();

    controller = module.get<NaverSensController>(NaverSensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
