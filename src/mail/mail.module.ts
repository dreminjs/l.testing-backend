import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { UserModule } from '@/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[UserModule,MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get('MAIL_HOST'),
        port: configService.get<number>('MAIL_PORT'),
        secure: true,
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('USER_APP_PASS')
        },
      },
    }),
  }),],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
