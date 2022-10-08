import { Module } from '@nestjs/common';
import { DetailsModule } from './bordingDetails/details.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.dev`, `.env.prod`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    DetailsModule,
    AuthModule,
  ],
})
export class AppModule {}
