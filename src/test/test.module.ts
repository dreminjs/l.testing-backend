import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { TestController } from './test.controller'
import { TestService } from './test.service'
import { UploadMiddleware } from '@/resume/upload.middleware'
import { MulterModule } from '@nestjs/platform-express'

@Module({
	imports: [
		MulterModule.registerAsync({
			useClass: UploadMiddleware
		})
	],
	controllers: [TestController],
	providers: [TestService, PrismaService]
})
export class TestModule {}
