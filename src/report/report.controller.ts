import { Roles } from '@/auth/decorators/admin.decorator'
import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common'
import { ReportService } from './report.service'

@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@Get('get-results')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async getResults() {
		return this.reportService.getResults()
	}
}
