import { Roles } from '@/auth/decorators/admin.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Roles('ADMIN')
	@UsePipes(new ValidationPipe())
	async getAll(
		@Query('maritalStatus') maritalStatus?: string,
		@Query('children') children?: string,
		@Query('militaryId') militaryId?: string
	) {
		return this.userService.getAll(maritalStatus, children, militaryId)
	}

	@Get(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async getById(@Param('id') id: number) {
		return this.userService.getById(id)
	}

	@Patch(':id')
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: UserDto) {
		await this.userService.getById(id)
		return this.userService.update(id, dto)
	}

	@Delete(':id')
	@Roles('ADMIN')
	@UsePipes(new ValidationPipe())
	async delete(@Param('id') id: number) {
		await this.userService.getById(id)
		return this.userService.delete(id)
	}
}
