/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';

// const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'on_boarding_manager',
  password: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});

// export default new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   database: process.env.DB_DATABASE,
//   password: configService.get<string>('DB_PASSWORD'),
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
// });
