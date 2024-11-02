import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

console.log('fire');

export default new DataSource({
  type: 'postgres',
  port: +configService.get('database.port'),
  username: configService.get('database.user'),
  password: configService.get('database.password'),
  host: configService.get('database.host'),
  database: configService.get('database.name'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
});
