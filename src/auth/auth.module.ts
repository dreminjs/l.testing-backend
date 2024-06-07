import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { getJwtConfig } from './config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ResumeModule } from '@/resume/resume.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		ResumeModule
	]
})
export class AuthModule {}
