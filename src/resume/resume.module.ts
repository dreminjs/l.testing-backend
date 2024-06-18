import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { PrismaService } from '@/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from './upload.middleware';
import { AwsModule } from '@/aws/aws.module';
import { AwsService } from '@/aws/aws.service';

@Module({
  imports:[
    MulterModule.registerAsync({
      // imports:[AwsModule],
      // inject: [AwsService],
      useClass: UploadMiddleware,
    }),
    AwsModule,
  ],
  controllers: [ResumeController],
  providers: [ResumeService,PrismaService],
  exports:[ResumeService]
})
export class ResumeModule {}
