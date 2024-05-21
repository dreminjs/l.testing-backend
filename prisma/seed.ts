// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function main() {
	await prisma.role.createMany({
		data: [
			{
				id: 1,
				roleName: 'ADMIN'
			},
			{
				id: 2,
				roleName: 'CHALLENGER'
			},
			{
				id: 3,
				roleName: 'MANAGER'
			}
		]
	})

	await prisma.user.create({
		data: {
			login: 'adminer',
			password: await hash('adminer'),
			roleId: 1
		}
	})
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
