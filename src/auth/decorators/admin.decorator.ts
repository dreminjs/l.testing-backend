import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { RoleName } from '@prisma/client'
import { JWTAuthGuard } from '../guards/jwt.guard'
import { RolesGuard } from '../guards/roles.guard'

export const Roles = (...roles: RoleName[]) =>
	applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(JWTAuthGuard, RolesGuard)
	)
