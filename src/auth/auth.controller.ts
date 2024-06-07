import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Roles } from './decorators/admin.decorator'

import { ChallengerLoginDto } from './dto/challenger-login.dto'
import { ChallengerRegisterDto } from './dto/challenger-register.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { RegisterDto } from './dto/register.dto'
import { ResumeService } from '@/resume/resume.service'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly resumeService: ResumeService

	) {}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('signup')
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('challenger-signup')
	async challengerRegister(@Body() dto: ChallengerRegisterDto) {
		const challenger = await this.authService.challengerRegister(dto)

		await this.resumeService.create(challenger.user.id)

		return challenger
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('challenger-login')
	async challengerLogin(@Body() dto: ChallengerLoginDto) {
		return this.authService.challengerLogin(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Roles('ADMIN', 'MANAGER', 'CHALLENGER')
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}
}
