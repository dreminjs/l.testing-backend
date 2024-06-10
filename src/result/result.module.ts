import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { ResultController } from './result.controller'
import { ResultService } from './result.service'

@Module({
	controllers: [ResultController],
	providers: [ResultService, PrismaService],
	exports: [ResultService]
})
export class ResultModule {}
