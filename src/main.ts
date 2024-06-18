import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({ credentials: true, origin: true })
	console.log(__dirname)
	await app.listen(8077)
}
bootstrap()
