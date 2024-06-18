import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import  * as express from 'express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	// app.useStaticAssets(join(__dirname, '..', 'public'));
	app.use(express.static(join(process.cwd(), 'uploads')));
	app.enableCors({ credentials: true, origin: true })
	await app.listen(8077)
}
bootstrap()
