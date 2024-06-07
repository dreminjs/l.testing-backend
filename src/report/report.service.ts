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
		militaryId?: string,
		startDate?: Date | string,
		endDate?: Date | string
	) {
		let whereClause = {
			isPassed: isPassed !== undefined ? isPassed === 'true' : undefined,
			user: {
				hasChildren: children !== undefined ? children === 'true' : undefined,
				isMilitaryId:
					militaryId !== undefined ? militaryId === 'true' : undefined,
				maritalStatus: maritalStatus || undefined
			},
			test: {
				testDirection: {
					directionName: directionName || undefined
				}
			}
		}

		if (startDate && endDate) {
			whereClause['interviewDate'] = {
				gte: new Date(startDate),
				lte: new Date(endDate)
			}
		}

		return this.prisma.result.findMany({
			where: whereClause,
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

	async getResultsOfDirections(direction?: string) {
		return this.prisma.result.findMany({
			orderBy: {
				test: {
					testDirection: {
						directionName: 'asc'
					}
				}
			},
			where: {
				test: {
					testDirection: {
						directionName: direction || undefined
					}
				}
			},
			select: {
				id: true,
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
