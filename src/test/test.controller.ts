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
import { TestDto } from './dto/test.dto'
import { TestService } from './test.service'

@Controller('tests')
export class TestController {
	constructor(private readonly testService: TestService) {}
	@Post()
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: TestDto) {
		return this.testService.create(dto)
	}

	@Get()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getAll(@Query('name') name?: string) {
		return this.testService.getAll(name)
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.testService.getById(id)
	}

	@Patch(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: TestDto) {
		await this.testService.getById(id)
		return this.testService.update(id, dto)
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.testService.getById(id)
		return this.testService.delete(id)
	}
}
