import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import enviromentValidation from './config/enviroment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import { MailModule } from './mail/mail.module';
import { UploadsModule } from './uploads/uploads.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { PaystackModule } from './paystack/paystack.module';
import { PaymentsModule } from './payments/payments.module';

/**
 * app environment
 */
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          synchronize: configService.get('database.synchronize'),
          port: +configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          host: configService.get('database.host'),
          database: configService.get('database.name'),
        };
      },
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    TicketsModule,
    // Importing an enviroment config specific for this module
    ConfigModule.forFeature(jwtConfig),
    // for asynchrousnously registering the jwt module and passing the config to the module
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MailModule,
    UploadsModule,
    PaginationModule,
    SubscribersModule,
    PaystackModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
