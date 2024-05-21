import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { TestDto } from './dto/test.dto'

@Injectable()
export class TestService {
	constructor(private prisma: PrismaService) {}

	async create(dto: TestDto) {
		return this.prisma.test.create({
			data: {
				...dto,

				accessTime: new Date(dto.accessTime).toISOString(),
				timeLimit: new Date(dto.timeLimit).toISOString()
			}
		})
	}

	async getAll() {
		return this.prisma.test.findMany({
			orderBy: { title: 'asc' },
			include: {
				testDirection: true,
				questions: {
					include: {
						answers: true
					}
				},
				results: true
			}
		})
	}

	async getById(id: number) {
		return this.prisma.test.findUnique({
			where: {
				id: +id
			},
			include: {
				testDirection: true,
				questions: {
					include: {
						answers: true
					}
				},
				results: true
			}
		})
	}

	async update(id: number, dto: TestDto) {
		await this.getById(id)
		return this.prisma.test.update({
			where: {
				id: +id
			},
			data: {
				directionId: dto.directionId,
				thresholdValue: dto.thresholdValue,
				attemptLimit: dto.attemptLimit,
				title: dto.title,
				accessTime: new Date(dto.accessTime).toISOString(),
				timeLimit: new Date(dto.timeLimit).toISOString()
			}
		})
	}

	async delete(id: number) {
		await this.getById(id)
		return this.prisma.test.delete({
			where: {
				id: +id
			}
		})
	}
}
