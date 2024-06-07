import { Body, Controller, Get, Logger, Param, ParseIntPipe, Patch, Req, UseInterceptors } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Resume } from '@prisma/client';
import { UpdateResumeDto } from './dto';

@Controller('resume')
export class ResumeController {
    
    private logger = new Logger(ResumeController.name)

    constructor(
        private resumeService:ResumeService
    ){}

    @Get("/:id")
    async findOne(@Param("id",ParseIntPipe) id:number) : Promise<Resume> {
       const resume =  await this.resumeService.getOneById(id)
       return resume
    }

    @Patch(":id")
    @UseInterceptors(FileInterceptor('file'))
    async updateOne(@Body() body:UpdateResumeDto,@Param("id",ParseIntPipe) id : number,@Req() req) : Promise<Resume>{
        this.logger.log(req.filename)
        return await this.resumeService.updateOne({...body,photo:req.filename},id)
    }


}
