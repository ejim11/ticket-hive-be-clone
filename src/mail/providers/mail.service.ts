import { ROOT_PATH } from '@/config/paths.config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Subscriber } from 'src/subscribers/subscriber.entity';
import { User } from 'src/users/user.entity';
import modifyNum from 'utils/modifyAmount';

/**
 * service for the mail module
 */
@Injectable()
export class MailService {
  /**
   * constructor
   * @param mailerService
   */
  constructor(
    /**
     * injecting mailer service
     */
    private mailerService: MailerService,
  ) {}

  /**
   * function for sending mail to user when they sign in
   * @param user
   */
  public async sendUserWelcome(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Ticket Hive - Onboarding Team  <${'team@ticket-hive.com'}>`,
      subject: `🎉 Welcome to Ticket Hive – Your Gateway to Amazing Events!`,
      template: path.join(ROOT_PATH, '/src/mail/templates/welcome.ejs'),
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3001',
      },
    });
  }

  /**
   * function for sending reset otp mail to user
   * @param user
   * @param otp
   */
  public async sendResetOtp(user: User, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Ticket Hive - Support Team  <${'team@ticket-hive.com'}>`,
      subject: `🔐 Reset Your Password – Let's Get You Back on Track!`,
      template: path.join(ROOT_PATH, '/src/mail/templates/resetOtp.ejs'),
      context: {
        name: user.firstName,
        email: user.email,
        otp: otp,
      },
    });
  }

  /**
   * function for sending mail to user when they subscribe to the newsletter
   * @param subscriber
   */
  public async sendSubscriberMail(subscriber: Subscriber): Promise<void> {
    await this.mailerService.sendMail({
      to: subscriber.email,
      from: `Ticket Hive -Team  <${'team@ticket-hive.com'}>`,
      subject: `Welcome to Ticket Hive's Newsletter! 🎉`,
      template: path.join(ROOT_PATH, '/src/mail/templates/subscription.ejs'),
      context: {
        email: subscriber.email,
        id: subscriber.id,
      },
    });
  }

  /**
   * function for sending mail to ticket buyer
   * @param user
   * @param ticket
   * @param eventName
   */
  public async sendTicketBuyerMail(
    user: Partial<User>,
    totalAmount: any,
    eventName: string,
    tickets: any,
    urls: string[],
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Ticket Hive -Team  <${'team@ticket-hive.com'}>`,
      subject: `🎟️ Your Ticket Purchase Confirmation – Ticket Hive`,
      template: path.join(ROOT_PATH, '/src/mail/templates/ticketBought.ejs'),
      context: {
        firstName: user.firstName,
        event: eventName,
        amount: modifyNum(String(totalAmount)),
        dateOfPurchase: new Date().toLocaleDateString(),
        ticketUrls: urls,
        tickets: tickets,
      },
    });
  }
}
