import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { TestDirectionController } from './test-direction.controller'
import { TestDirectionService } from './test-direction.service'

@Module({
	controllers: [TestDirectionController],
	providers: [TestDirectionService, PrismaService]
})
export class TestDirectionModule {}
