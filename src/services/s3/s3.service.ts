import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

@Injectable()
export class S3Service {
  private readonly s3: aws.S3;

  constructor(private readonly configService: ConfigService) {
    aws.config.update({
      accessKeyId: configService.get<string>("AWS_S3_IAM"),
      secretAccessKey: configService.get<string>("AWS_S3_IAM_SECRET"),
      region: configService.get<string>("AWS_S3_REGION")
    });

    this.s3 = new aws.S3();
  }

  async uploadImage(file): Promise<ManagedUpload.SendData> {
    const urlKey = `places/1${file.originalname}`
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      ContentType: file.mimetype,
      Key: urlKey,
      Body: file.buffer,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async deleteImage(key: string): Promise<Object> {
    const deleteParams: S3.Types.DeleteObjectRequest = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Key: key
    }
    await this.s3.deleteObject(deleteParams).promise();

    return { message:"success" }
  }
}
