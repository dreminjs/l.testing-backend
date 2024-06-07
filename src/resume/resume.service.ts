import { Injectable } from '@nestjs/common';
import { Resume } from '@prisma/client';
import { UpdateResumeDto } from './dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ResumeService {
    constructor(
        private prisma:PrismaService
    ){}

    async getOneById(userId:number) : Promise<Resume> {
       return await this.prisma.resume.findFirst({where:{userId}})
    }

    async create(userId:number): Promise<Resume> {
        return await this.prisma.resume.create({data:{
            desiredSalary:0,
            photo:"",
            age:0,
            about:"",
            experience:"",
            userId
        }})
    }

    async updateOne(data:UpdateResumeDto,userId:number): Promise<Resume> {
        return await this.prisma.resume.update({where:{userId},data:{
            about:data.about,
            age:Number(data.age),
            desiredSalary:Number(data.desiredSalary),
            experience:data.experience,
            photo:data.photo
        }})
    }
}
