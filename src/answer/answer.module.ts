import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AnswerController } from './answer.controller'
import { AnswerService } from './answer.service'

@Module({
	controllers: [AnswerController],
	providers: [AnswerService, PrismaService]
})
export class AnswerModule {}
