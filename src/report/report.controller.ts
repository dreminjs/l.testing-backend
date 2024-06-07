import { Roles } from '@/auth/decorators/admin.decorator'
import {
	Controller,
	Get,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReportService } from './report.service'

@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@Get('get-results')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async getResults(
		@Query('isPassed') isPassed?: string,
		@Query('directionName') directionName?: string,
		@Query('maritalStatus') maritalStatus?: string,
		@Query('children') children?: string,
		@Query('militaryId') militaryId?: string,
		@Query('startDate') startDate?: Date | string,
		@Query('endDate') endDate?: Date | string
	) {
		return this.reportService.getResults(
			isPassed,
			directionName,
			maritalStatus,
			children,
			militaryId,
			startDate,
			endDate
		)
	}

	@Get('get-results-of-directions')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async getResultsOfDirections(@Query('direction') direction?: string) {
		return this.reportService.getResultsOfDirections(direction)
	}
}
