import { Module } from '@nestjs/common';
import { CompanyDetailsModule } from './company-details/company-details.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.dev`, `.env.prod`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CompanyDetailsModule,
  ],
})
export class AppModule {}
