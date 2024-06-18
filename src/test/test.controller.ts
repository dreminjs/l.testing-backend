import { Roles } from '@/auth/decorators/admin.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TestDto } from './dto/test.dto'
import { TestService } from './test.service'
import { CurrentUser } from '@/user/currentUser.decorator'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('tests')
export class TestController {
	constructor(private readonly testService: TestService) {}

	private logger = new Logger(TestController.name)
	
	@Post()
	@Roles('ADMIN', 'MANAGER')
	// @UsePipes(new ValidationPipe())
	@UseInterceptors(FileInterceptor('photo'))
	async create(@Body() dto: TestDto,@Req() req) {

		this.logger.log(req.filename)
		this.logger.log(dto)
		return this.testService.create(dto,req?.filename)
	}

	@Get()
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getAll(@CurrentUser() user,@Query('name') name?: string,@Query("isAdmin") isAdmin?: string) {
		this.logger.log(JSON.parse(isAdmin))
		return this.testService.getAll(user.id,name,JSON.parse(isAdmin))
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.testService.getById(id)
	}

	@Patch(':id')
	@Roles('ADMIN', 'MANAGER')
	@UseInterceptors(FileInterceptor('photo'))
	async update(@Param('id') id: number, @Body() dto: TestDto,@Req() req) {
		await this.testService.getById(id)
		return this.testService.update(id, {...dto,photo:req.filename})
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.testService.getById(id)
		return this.testService.delete(id)
	}
}
