import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

/**
 * provider class for uploading to aws
 */
@Injectable()
export class UploadToAwsProvider {
  /**
   * constructor
   * @param configService
   */
  constructor(
    /**
     * injecting the config service
     */
    private readonly configService: ConfigService,
  ) {}

  /**
   * function for uploading image file to aws
   * @param file
   * @returns stored file
   */
  public async fileUpload(file: Express.Multer.File) {
    const s3 = new S3();

    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * function for uploading file to AWS
   * @param fileBuffer
   * @param ticketId
   * @returns tickets name
   */
  public async uploadTicketFile(fileBuffer: Buffer, ticketId: string) {
    const s3 = new S3();
    const key = `tickets/ticket-${ticketId}.pdf`;

    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName'),
          Body: fileBuffer,
          Key: key,
          ContentType: 'application/pdf',
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   *function for generating the image filename
   * @param file function for generating the image file name
   * @returns the image file name
   */
  private generateFileName(file: Express.Multer.File) {
    // extract file name
    const name = file.originalname.split('.')[0];

    // Remove white spaces
    name.replace(/|s/g, '').trim();

    // extract the extension
    const extension = path.extname(file.originalname);

    // generate time stamp
    const timestamp = new Date().getTime().toString().trim();

    // return file uuid
    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}
