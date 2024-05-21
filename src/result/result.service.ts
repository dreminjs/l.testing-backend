import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ResultDto } from './dto/result.dto'

@Injectable()
export class ResultService {
	constructor(private prisma: PrismaService) {}

	async create(dto: ResultDto) {
		return this.prisma.result.create({
			data: {
				...dto
			}
		})
	}

	async getAll() {
		return this.prisma.result.findMany({
			orderBy: { user: { lastName: 'asc' } },
			include: {
				test: { include: { testDirection: true } },
				user: true
			}
		})
	}

	async getById(id: number) {
		return this.prisma.result.findUnique({
			where: {
				id: +id
			},
			include: {
				test: { include: { testDirection: true } },
				user: true
			}
		})
	}

	async update(id: number, dto: ResultDto) {
		await this.getById(id)
		return this.prisma.result.update({
			where: {
				id: +id
			},
			data: {
				...dto
			}
		})
	}

	async delete(id: number) {
		await this.getById(id)
		return this.prisma.result.delete({
			where: {
				id: +id
			}
		})
	}
}
