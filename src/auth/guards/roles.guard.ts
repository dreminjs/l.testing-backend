import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'
type RoleName = 'ADMIN' | 'MANAGER' | 'CHALLENGER'

const RoleMapping: Record<RoleName, number> = {
	ADMIN: 1,
	MANAGER: 3,
	CHALLENGER: 2
}

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles: RoleName[] = this.reflector.get<RoleName[]>(
			'roles',
			context.getHandler()
		)
		if (!roles) {
			return true
		}

		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		if (!user.roleId) throw new ForbiddenException('У пользователя нет роли!')

		const requiredRoleIds = roles.map(roleName => RoleMapping[roleName])

		return requiredRoleIds.includes(user.roleId)
	}
}
