import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dto';
import { UserService } from '@/user/user.service';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(
        private readonly userService:UserService,
        private readonly mailService:MailService
    ){}

    @Post()
    async sendEmail(@Body() dto: SendEmailDto){
        const user = await this.userService.getById(dto.userId)

        await this.mailService.sendMail(user.email,dto.date)
    }
}
