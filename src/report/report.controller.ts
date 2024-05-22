import { Roles } from '@/auth/decorators/admin.decorator'
import {
	Controller,
	Get,
	Param,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReportService } from './report.service'

@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@Get('get-results/:id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async getResults(@Param('id') id: number) {
		return this.reportService.getResults(id)
	}
}
