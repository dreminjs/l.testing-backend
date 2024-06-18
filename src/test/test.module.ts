import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { TestController } from './test.controller'
import { TestService } from './test.service'
import { UploadMiddleware } from '@/resume/upload.middleware'
import { MulterModule } from '@nestjs/platform-express'
import { AwsModule } from '@/aws/aws.module'
import { AwsService } from '@/aws/aws.service'

@Module({
	imports: [
	    MulterModule.registerAsync({
			// imports:[AwsModule],
			// inject: [AwsService],
			useClass: UploadMiddleware,
		  }),
		AwsModule
	],
	controllers: [TestController],
	providers: [TestService, PrismaService]
})
export class TestModule {}
