import { Test, TestingModule } from '@nestjs/testing';
import { CertifiedImageService } from './certified-image.service';

describe('CertifiedImageService', () => {
  let service: CertifiedImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertifiedImageService],
    }).compile();

    service = module.get<CertifiedImageService>(CertifiedImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
