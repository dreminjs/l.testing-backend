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
import { AnswerService } from './answer.service'
import { AnswerDto } from './dto/answer.dto'

@Controller('answers')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Post()
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: AnswerDto) {
		return this.answerService.create(dto)
	}

	@Get()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getAll() {
		return this.answerService.getAll()
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.answerService.getById(id)
	}

	@Put(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: AnswerDto) {
		await this.answerService.getById(id)
		return this.answerService.update(id, dto)
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.answerService.getById(id)
		return this.answerService.delete(id)
	}
}
