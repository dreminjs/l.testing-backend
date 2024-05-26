import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReportService {
	constructor(private prisma: PrismaService) {}

	async getResults(
		isPassed?: string,
		directionName?: string,
		maritalStatus?: string,
		children?: string,
		militaryId?: string
	) {
		return this.prisma.result.findMany({
			where: {
				isPassed: isPassed !== undefined ? isPassed === 'true' : undefined,
				user: {
					hasChildren: children !== undefined ? children === 'true' : undefined,
					isMilitaryId:
						militaryId !== undefined ? militaryId === 'true' : undefined,
					maritalStatus: maritalStatus
				},
				test: {
					testDirection: {
						directionName: directionName
					}
				}
			},
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
						middleName: true,
						hasChildren: true,
						isMilitaryId: true,
						maritalStatus: true
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
