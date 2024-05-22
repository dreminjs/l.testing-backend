import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReportService {
	constructor(private prisma: PrismaService) {}

	async getResults(resultId: number) {
		return this.prisma.result.findMany({
			where: { id: +resultId },
			select: {
				id: true,
				completionTime: true,
				interviewDate: true,
				isPassed: true,
				scoreId: true,
				test: {
					select: {
						title: true,
						testDirection: {
							select: {
								directionName: true
							}
						}
					}
				}
			}
		})
	}
}
