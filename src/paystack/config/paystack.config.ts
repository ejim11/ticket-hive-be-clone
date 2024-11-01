import { registerAs } from '@nestjs/config';

export default registerAs('paystack', () => {
  return {
    secret: process.env.PAYSTACK_SECRET_KEY,
    baseUrl: process.env.PAYSTACK_BASE_URL,
  };
});
