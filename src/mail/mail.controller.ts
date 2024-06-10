import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SendEmailDto } from './dto';
import { UserService } from '@/user/user.service';
import { MailService } from './mail.service';
import { ResultService } from '@/result/result.service';

@Controller('mail')
export class MailController {

    constructor(
        private readonly userService:UserService,
        private readonly mailService:MailService,
        private readonly resultService:ResultService 
    ){}

    private logger = new Logger(MailController.name)

    @Post()
    async sendEmail(@Body() dto: SendEmailDto){
        
        this.logger.log(dto)

        const user = await this.userService.getById(dto.userId)

        await this.mailService.sendMail(user.email,dto.date)

        await this.resultService.update(dto.resultId,{interviewDate:new Date(dto.date)})
    }
}
