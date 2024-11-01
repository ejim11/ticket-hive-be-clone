import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

/**
 * the boostrap nest function
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // general validation
  app.useGlobalPipes(
    new ValidationPipe({
      // validates the body
      // If set to true validator will strip validated object of any properties that do not have any decorators.
      whitelist: true,

      // If set to true, instead of stripping non-whitelisted properties validator will throw an error
      forbidNonWhitelisted: true,

      // transforms the request obj to an instance of the Dto class
      transform: true,

      transformOptions: {
        // validation pipe takes care of implicit conversions
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api/v1');

  // swagger config
  const swaggerConfig = new DocumentBuilder()
    // setting the title of the documentation
    .setTitle('TicketHive API')
    // setting the description of the documentation
    .setDescription('Use the base API Url as http://localhost:3001')
    .setTermsOfService('http://localhost:3001/terms-of-service')
    .setContact(
      'Ejim Favour',
      'https://www.jimmy-dev.me/',
      'favourejim56@gmail.com',
    )
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3001', 'Local Server')
    .setVersion('1.0')
    .build();

  // instantiate the doc
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // setup
  SwaggerModule.setup('api', app, document);

  // setup aws sdk
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  // enable cors
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
