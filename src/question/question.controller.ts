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
import { QuestionDto } from './dto/question.dto'
import { QuestionService } from './question.service'

@Controller('questions')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Post()
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: QuestionDto) {
		return this.questionService.create(dto)
	}

	@Get()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getAll() {
		return this.questionService.getAll()
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.questionService.getById(id)
	}

	@Put(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: QuestionDto) {
		await this.questionService.getById(id)
		return this.questionService.update(id, dto)
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.questionService.getById(id)
		return this.questionService.delete(id)
	}
}
