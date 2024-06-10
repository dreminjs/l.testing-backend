import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { AnswerDto } from './dto/answer.dto'

@Injectable()
export class AnswerService {
	constructor(private prisma: PrismaService) {}

	async create(dto: AnswerDto) {

		
		return this.prisma.answer.create({
			data: {
				...dto
			}
		})
	}

	async getAll() {
		return this.prisma.answer.findMany()
	}

	async getById(id: number) {
		return this.prisma.answer.findUnique({
			where: {
				id: +id
			}
		})
	}

	async update(id: number, dto: AnswerDto) {
		await this.getById(id)
		return this.prisma.answer.update({
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
		return this.prisma.answer.delete({
			where: {
				id: +id
			}
		})
	}
}
