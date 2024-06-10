import { PrismaService } from '@/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { TestDirectionDto } from './dto/test-direction.dto'

@Injectable()
export class TestDirectionService {
	constructor(private prisma: PrismaService) {}

	private logger = new Logger(TestDirectionService.name)


	async create(dto: TestDirectionDto) {
		return this.prisma.testDirection.create({
			data: {
				...dto
			}
		})
	}

	async getAll() {
		return this.prisma.testDirection.findMany({
			orderBy: { directionName: 'asc' },
			include: { tests: true }
		})
	}

	async getById(id: number) {
		return this.prisma.testDirection.findUnique({
			where: {
				id: +id
			},
			include: { tests: true }
		})
	}

	async update(id: number, dto: TestDirectionDto) {
		await this.getById(id)
		return this.prisma.testDirection.update({
			where: {
				id: +id
			},
			data: {
				directionName: dto.directionName
			}
		})
	}

	async delete(id: number) {
		
		const tests = await this.prisma.test.findMany({
			where: {
				directionId: +id,
			},
		});
	
		await this.prisma.result.deleteMany({
			where:{
				testId:{
					in:tests.map(test => test.id)
				}
			}
		})

		await this.prisma.test.deleteMany({
			where:{
				directionId: +id
			}
		})

		return await this.prisma.testDirection.delete({
			where: {
				id: +id,
			},
		});
	}
}
