import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

import { AnswerModule } from './answer/answer.module'
import { QuestionModule } from './question/question.module'
import { ResultModule } from './result/result.module'
import { TestDirectionModule } from './test-direction/test-direction.module'
import { ServeStaticModule } from '@nestjs/serve-static';
import { TestModule } from './test/test.module'
import { UserModule } from './user/user.module'
import { ReportModule } from './report/report.module';
import { MailModule } from './mail/mail.module';
import { ResumeModule } from './resume/resume.module';
import { join } from 'path'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		AnswerModule,
		AnswerModule,
		QuestionModule,
		ResultModule,
		TestDirectionModule,
		TestModule,
		UserModule,
		ReportModule,
		MailModule,
		ResumeModule,
		ServeStaticModule.forRoot({
			rootPath: "./uploads",
		  }),
	],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
