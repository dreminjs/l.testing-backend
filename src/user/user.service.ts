import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAll(maritalStatus?: string, children?: string, militaryId?: string) {
		const where: any = {}

		if (maritalStatus !== undefined) {
			where.maritalStatus = maritalStatus
		}
		if (children !== undefined) {
			where.hasChildren = children === 'true'
		}

		if (militaryId !== undefined) {
			where.isMilitaryId = militaryId === 'true'
		}

		return this.prisma.user.findMany({
			where: where,
			include: {
				role: true
			},
			orderBy: [{ login: 'asc' }, { lastName: 'asc' }]
		})
	}
	async getById(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id: +id
			},
			include: {
				tests: true,
				role: true
			}
		})
	}

	async update(id: number, dto: UserDto) {
		const user = await this.getById(id)

		return this.prisma.user.update({
			where: { id: +id },

			data: {
				...dto,
				login: dto.login,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	async delete(id: number) {
		await this.getById(id)
		return this.prisma.user.delete({
			where: {
				id: +id
			}
		})
	}
}
