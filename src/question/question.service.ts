import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { QuestionDto } from './dto/question.dto'

@Injectable()
export class QuestionService {
	constructor(private prisma: PrismaService) {}

	async create(dto: QuestionDto) {
		return this.prisma.question.create({
			data: {
				...dto
			}
		})
	}

	async getAll() {
		return this.prisma.question.findMany({
			include: {
				answers: true
			}
		})
	}

	async getById(id: number) {
		return this.prisma.question.findUnique({
			where: {
				id: +id
			},
			include: {
				answers: true
			}
		})
	}

	async update(id: number, dto: QuestionDto) {
		await this.getById(id)
		return this.prisma.question.update({
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
		return this.prisma.question.delete({
			where: {
				id: +id
			}
		})
	}
}
