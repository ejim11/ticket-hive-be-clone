import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

// const configService = new ConfigService();

console.log(+process.env.DATABASE_PORT);

export default new DataSource({
  type: 'postgres',
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: false,
});
