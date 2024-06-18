import { Roles } from '@/auth/decorators/admin.decorator'
import { v4 as uuidv4 } from 'uuid';
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
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TestDto } from './dto/test.dto'
import { TestService } from './test.service'
import { CurrentUser } from '@/user/currentUser.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { AwsService } from '@/aws/aws.service'

@Controller('tests')
export class TestController {
	constructor(private readonly testService: TestService,private readonly awsService:AwsService) {}

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
	async update(@Param('id') id: number, @Body() dto: TestDto,@Req() req: any,@UploadedFile() photo: Express.Multer.File) {

		// const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		
		// this.logger.log(photo.buffer)

		// const extension = photo.originalname.split('.').pop();

		// const filename = `${uuidv4()}-${uniqueSuffix}.${extension}`;


		// const res = await this.awsService.uploadFile(photo.buffer,filename)

		await this.testService.getById(id)

		return this.testService.update(id, {...dto,photo:req.filename});
	}

	@Delete(':id')
	@Roles('ADMIN', 'MANAGER')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.testService.getById(id)
		return this.testService.delete(id)
	}
}
