import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReportService {
	constructor(private prisma: PrismaService) {}

	async getResults() {
		return this.prisma.result.findMany({
			select: {
				id: true,
				completionTime: true,
				interviewDate: true,
				isPassed: true,
				scoreId: true,
				user: {
					select: {
						lastName: true,
						firstName: true,
						middleName: true
					}
				},
				test: {
					select: {
						thresholdValue: true,
						accessTime: true,
						attemptLimit: true,
						timeLimit: true,
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
