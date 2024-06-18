import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from "aws-sdk"


@Injectable()
export class AwsService {


    constructor(private readonly configService: ConfigService){}

    private readonly s3 = new S3({
        accessKeyId: this.configService.get("AWS_ACCESS_KEY"),
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY")
    })

    async uploadFile(data:Buffer,filename:string) {
        try {
            const uploadRes = await this.s3.upload({
                Bucket:this.configService.get("AWS_BUSKET_NAME"),
                Body:data,
                Key: `${filename}`,
                ACL:'public-reads',
                ContentDisposition: "inline",
            }).promise()

            return uploadRes
        } catch(err){
            console.log(err)
        }
    }   


}
