import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * controller for the app route
 */
@Controller()
export class AppController {
  /**
   *constructor
   * @param appService
   */
  constructor(
    /**
     * injecting the app service
     */
    private readonly appService: AppService,
  ) {}

  /**
   * get route for the app
   * @returns hello
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
