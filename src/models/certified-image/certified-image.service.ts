import { CertifiedImage } from 'src/models/certified-image/entities/certified-image.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CertifiedImageService {
  constructor(
    @InjectRepository(CertifiedImage)
    private readonly certifiedImageRepository: Repository<CertifiedImage>,
  ) {}

  async createCertifiedImage(imageData: any) {
    const certifiedImage = new CertifiedImage();
    certifiedImage.certified_image_url = imageData.certified_image_url;
    return this.certifiedImageRepository.save(certifiedImage);
  }
}
