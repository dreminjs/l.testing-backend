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

	await prisma.testDirection.createMany({
		data:[
			{	
				directionName:"java",
			},
			{
				directionName:"c#",
			},
			{
				directionName:"js"
			},
			{
				directionName:"тестирование"
			},
			{
				directionName:"бд и субд "
			}
		]
	})
	
	const currentDate = new Date()

	const currentMonth = currentDate.getMonth();

	currentDate.setMonth(currentMonth + 1)

	await prisma.test.createMany({
		data:[
			{
				title:"Java основы",
				thresholdValue:10,
				timeLimit:10,
				directionId:1,
				accessTime:currentDate.toISOString(),
				photo:"java.jpg",
				attemptLimit:5,
			},
			{
				title:"Java Бэкенд разработка.",
				thresholdValue:10,
				timeLimit:10,
				directionId:2,
				accessTime:currentDate.toISOString(),
				photo:"java.jpg",
				attemptLimit:5,
			},
			{
				title:"C# основы",
				thresholdValue:10,
				timeLimit:10,
				directionId:2,
				accessTime:currentDate.toISOString(),
				photo:"csharp.jpg",
				attemptLimit:5,
			},
			{
				title:"JS Фронтенд разработка.",
				thresholdValue:10,
				timeLimit:10,
				directionId:3,
				accessTime:currentDate.toISOString(),
				photo:"js.jpg",
				attemptLimit:5,
			},
			{
				title:"JS основы",
				thresholdValue:10,
				timeLimit:10,
				directionId:3,
				accessTime:currentDate.toISOString(),
				photo:"js.jpg",
				attemptLimit:5,
			},
			{
				title:"C# Бэкенд разработка.",
				thresholdValue:10,
				timeLimit:10,
				directionId:2,
				accessTime:currentDate.toISOString(),
				photo:"csharp.jpg",
				attemptLimit:5,
			},{
				title:"тестирование",
				thresholdValue:10,
				timeLimit:10,
				directionId:4,
				accessTime:currentDate.toISOString(),
				photo:"testing.jpg",
				attemptLimit:5,
			},{
				title:"бд и субд ",
				thresholdValue:10,
				timeLimit:10,
				directionId:5,
				accessTime:currentDate.toISOString(),
				photo:"database.jpg",
				attemptLimit:5,
			}
		]
	})


	await prisma.user.createMany({
		data:[
			{
				firstName:"александра",
				middleName:"дмитриевна",
				lastName:"бизюк",
				phoneNumber:"+375441275911",
				maritalStatus:"Состоит в зарегистрированном браке",
				email:"sanyo4ek2011@gmail.com",
				roleId:2,
			},
			{
				firstName:"владислав",
				middleName:"романович",
				lastName:"бурец",
				phoneNumber:"+375111275911",
				maritalStatus:"Состоит в зарегистрированном браке",
				email:"vladosik2005@gmail.com",
				roleId:2,
			},
			{
				firstName:"роман",
				middleName:"александрович",
				lastName:"гаврилов",
				phoneNumber:"+375441575911",
				maritalStatus:"Состоит в зарегистрированном браке",
				email:"karapuzRoman2012@gmail.com",
				roleId:2,
			},
			{
				firstName:"герман",
				middleName:"витальевич",
				lastName:"гридюшко",
				phoneNumber:"+375441275211",
				maritalStatus:"Состоит в зарегистрированном браке",
				email:"germanpro228@gmail.com",
				roleId:2,
			},
			{
				firstName:"софия",
				middleName:"руслановна",
				lastName:"евтухова",
				phoneNumber:"+375441275912",
				maritalStatus:"Состоит в зарегистрированном браке",
				email:"informatica@gmail.com",
				roleId:2,
			},
			{
				firstName:"елизавета",
				middleName:"владимировна",
				lastName:"зенчик ",
				phoneNumber:"+375441275933",
				maritalStatus:"Состоит в зарегистрированном браке",
				email:"elizavetazencik@gmail.com",
				roleId:2,
			}
		]
	})

	await prisma.resume.createMany({
		data:[
			{
				userId:1,
				age:0,
				about:"",
				experience:"",
				desiredSalary:0,
			},
			{
				userId:2,
				age:0,
				about:"",
				experience:"",
				desiredSalary:0,
			},
			{
				userId:3,
				age:0,
				about:"",
				experience:"",
				desiredSalary:0,
			},
			{
				userId:4,
				age:0,
				about:"",
				experience:"",
				desiredSalary:0,
			},
			{
				userId:5,
				age:0,
				about:"",
				experience:"",
				desiredSalary:0,
			},
			{
				userId:6,
				age:0,
				about:"",
				experience:"",
				desiredSalary:0,
			},
		]
	})

	await prisma.user.create({
		data: {
			login: 'adminer',
			password: await hash('adminer'),
			roleId: 1,

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
