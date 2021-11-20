import { CertifiedImage } from 'src/models/certified-image/entities/certified-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CertifiedImageService } from './certified-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([CertifiedImage])],
  exports: [CertifiedImageService],
  providers: [CertifiedImageService],
})
export class CertifiedImageModule {}
