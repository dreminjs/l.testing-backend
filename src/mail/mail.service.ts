import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SendEmailDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {

    constructor(
        private readonly mailerService: MailerService,
    ){}

    async sendMail(to:string,date:Date): Promise<void> {

        await this.mailerService.sendMail({
             from: process.env.MAIL_USER,
             to,
             subject:"Вы приглашены на собеседование!" ,
             html:`
   
                   <main>
                       <h3>Madson.</h3>
                       <p>
                           здравствуйте, вас приветствует компания модсен, вы успешно прошли тестирование и мы приглашаем вас на собеседование ${new Date(date).toLocaleDateString('ru-RU', {  year: 'numeric',month: 'long',day: 'numeric'})} ${new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}                                                                                                   
                       </p>
                   </main>
                   `
           });
         }
}
