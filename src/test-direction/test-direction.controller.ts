import { Roles } from '@/auth/decorators/admin.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TestDirectionDto } from './dto/test-direction.dto'
import { TestDirectionService } from './test-direction.service'

@Controller('test-directions')
export class TestDirectionController {
	constructor(private readonly testDirectionService: TestDirectionService) {}
	@Post()
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: TestDirectionDto) {
		return this.testDirectionService.create(dto)
	}

	@Get()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getAll() {
		return this.testDirectionService.getAll()
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.testDirectionService.getById(id)
	}

	@Put(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: TestDirectionDto) {
		await this.testDirectionService.getById(id)
		return this.testDirectionService.update(id, dto)
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.testDirectionService.getById(id)
		return this.testDirectionService.delete(id)
	}
}
