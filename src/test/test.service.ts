import { PrismaService } from '@/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { TestDto, UpdateTestDto } from './dto/test.dto'

@Injectable()
export class TestService {
	constructor(private prisma: PrismaService) {}

	private logger = new Logger(TestService.name)

	async create(dto: TestDto, filename: string) {
		return this.prisma.test.create({
			data: {
				attemptLimit: +dto.attemptLimit,
				thresholdValue: +dto.thresholdValue,
				directionId: +dto.directionId,
				timeLimit: +dto.timeLimit,
				title: dto.title,
				photo: filename,
				accessTime: new Date(dto.accessTime).toISOString()
			}
		})
	}

	async getAll(id: number, name?: string,isAdmin?:boolean) {
		return this.prisma.test.findMany({
			orderBy: { title: 'asc' },
			where: {
				testDirection: { directionName: name || undefined },
				...(!isAdmin && {
					questions: {
						some: {
							answers: {
								some: {}
							}
						}
					}
				})
			},
			include: {
				testDirection: true,

				questions: {
					include: {
						answers: true
					}
				},
				results: {
					where: {
						userId: id
					}
				}
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

	async update(id: number, dto: UpdateTestDto) {
		await this.getById(id)
		return this.prisma.test.update({
			where: {
				id: +id
			},
			data: {
				directionId: +dto.directionId,
				thresholdValue: +dto.thresholdValue,
				attemptLimit: +dto.attemptLimit,
				title: dto.title,
				accessTime: new Date(dto.accessTime).toISOString(),
				timeLimit: +dto.timeLimit,
				photo: dto.photo
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
