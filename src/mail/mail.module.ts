import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

// makes importation of mail module to any module
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      // we need the config service to configure the mailer module
      inject: [ConfigService],
      // we use the useFactory to inject the mailer module
      useFactory: async (config: ConfigService) => {
        // console.log(
        //   config.get('appConfig.mailHost'),
        //   config.get('appConfig.smtpUsername'),
        //   config.get('appConfig.smtpPassword'),
        // );
        return {
          transport: {
            host: config.get('appConfig.mailHost'),
            secure: true,
            port: 465,
            auth: {
              user: config.get('appConfig.smtpUsername'),
              pass: config.get('appConfig.smtpPassword'),
            },
            // tls: { rejectUnauthorized: false },
          },
          default: {
            from: `TicketHive <${'team@ticket-hive.com'}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new EjsAdapter({
              inlineCssEnabled: true,
            }),
            options: {
              strict: false,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
