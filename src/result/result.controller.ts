import { Roles } from '@/auth/decorators/admin.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ResultDto } from './dto/result.dto'
import { ResultService } from './result.service'

@Controller('results')
export class ResultController {
	constructor(private readonly resultService: ResultService) {}
	@Post()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: ResultDto) {
		return this.resultService.create(dto)
	}

	@Get()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getAll(
		@Query('directionName') directionName?: string,
		@Query('isPassed') isPassed?: string
	) {
		return this.resultService.getAll(directionName, isPassed)
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.resultService.getById(id)
	}

	@Patch(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: ResultDto) {
		await this.resultService.getById(id)
		return this.resultService.update(id, dto)
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.resultService.getById(id)
		return this.resultService.delete(id)
	}
}
