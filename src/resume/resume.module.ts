import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { PrismaService } from '@/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from './upload.middleware';

@Module({
  imports:[
    MulterModule.registerAsync({
      useClass: UploadMiddleware,
    }),
  ],
  controllers: [ResumeController],
  providers: [ResumeService,PrismaService],
  exports:[ResumeService]
})
export class ResumeModule {}
