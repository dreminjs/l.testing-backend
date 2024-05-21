import { EXCEPTIONS } from '@/constants/exceptions'
import { PrismaService } from '@/prisma/prisma.service'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { ChallengerLoginDto } from './dto/challenger-login.dto'
import { ChallengerRegisterDto } from './dto/challenger-register.dto'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}
	async register(dto: RegisterDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { login: dto.login }
		})
		if (oldUser)
			throw new BadRequestException(EXCEPTIONS.USER_ALREADY_EXISTS_EXCEPTION)

		const user = await this.prisma.user.create({
			data: {
				login: dto.login,
				password: await hash(dto.password),
				roleId: dto.roleId
			}
		})
		const tokens = await this.issueTokens(user.id)
		return {
			user,
			...tokens
		}
	}
	async login(dto: LoginDto) {
		const { ...user } = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}
	async challengerRegister(dto: ChallengerRegisterDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})
		if (oldUser)
			throw new BadRequestException(EXCEPTIONS.USER_ALREADY_EXISTS_EXCEPTION)

		const user = await this.prisma.user.create({
			data: {
				...dto,
				roleId: +2
			}
		})
		const tokens = await this.issueTokens(user.id)
		return {
			user,
			...tokens
		}
	}

	async challengerLogin(dto: ChallengerLoginDto) {
		const { login, password, ...user } = await this.validateChallenger(dto)
		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result)
			throw new UnauthorizedException(EXCEPTIONS.INVALID_TOKEN_EXCEPTION)

		const user = await this.prisma.user.findUnique({
			where: { id: result.id }
		})

		const tokens = await this.issueTokens(user.id)
		return {
			user,
			...tokens
		}
	}

	private async validateUser(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: { login: dto.login }
		})

		if (!user) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)

		const isValid = await verify(user.password, dto.password)

		if (!user || !isValid)
			throw new UnauthorizedException(EXCEPTIONS.INVALID_PASSWORD_EXCEPTION)
		return user
	}

	private async validateChallenger(dto: ChallengerLoginDto) {
		const challenger = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (!challenger) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)

		const isValid = challenger.email === dto.email

		if (!challenger || !isValid)
			throw new UnauthorizedException(EXCEPTIONS.INVALID_EMAIL_EXCEPTION)
		return challenger
	}

	private async issueTokens(id: number) {
		const data = { id: id }

		const accessToken = await this.jwt.signAsync(data, {
			expiresIn: process.env.ACCESS_TOKEN_VALIDITY
		})
		const refreshToken = await this.jwt.signAsync(data, {
			expiresIn: process.env.REFRESH_TOKEN_VALIDITY
		})

		return { accessToken, refreshToken }
	}
}
