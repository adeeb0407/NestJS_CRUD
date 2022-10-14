/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'phd',
  password: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
