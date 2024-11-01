import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { SignInProvider } from '../sign-in.provider';
import { ForgotPassswordDto } from 'src/auth/dtos/forgot-password.dto';
import { ForgotPasswordProvider } from '../forgot-password.provider';
import { ResetPasswordProvider } from '../reset-password.provider';
import { ResetPasswordDto } from 'src/auth/dtos/reset-password.dto';
import { RefreshTokenDto } from 'src/auth/dtos/refresh-token.dto';
import { RefreshTokenProvider } from '../refresh-token.provider';

/**
 * auth service for the auth module
 */
@Injectable()
export class AuthService {
  /**
   * constructor
   * @param signInProvider
   * @param forgotPasswordProvider
   * @param resetPasswordProvider
   * @param refreshTokenProvider
   */
  constructor(
    /**
     * injecting the sign in provider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * injecting the forgotPasswordProvider
     */
    private readonly forgotPasswordProvider: ForgotPasswordProvider,

    /**
     * injecting the resetPasswordProvider
     */
    private readonly resetPasswordProvider: ResetPasswordProvider,

    /**
     * injecting the refresh token provider
     */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  /**
   * function for signing in a user
   * @param signInDto
   * @returns access and refresh tokens
   */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  /**
   * function for getting the otp email
   * @param forgotPasswordDto
   * @returns null
   */
  public async forgotPassword(forgotPasswordDto: ForgotPassswordDto) {
    return await this.forgotPasswordProvider.forgotPassword(forgotPasswordDto);
  }

  /**
   * function for resetting password
   * @param resetPasswordDto
   * @returns user
   */
  public async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await this.resetPasswordProvider.resetPassword(resetPasswordDto);
  }

  /**
   * function for refreshing access token after it expires
   * @param refreshTokenDto
   * @returns access and refresh tokens
   */
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
