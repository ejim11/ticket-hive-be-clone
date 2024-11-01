import { Injectable } from '@nestjs/common';

/**
 * app service
 */
@Injectable()
export class AppService {
  /**
   * dummy function for the app service
   * @returns hello world
   */
  getHello(): string {
    return 'Hello World!';
  }
}
