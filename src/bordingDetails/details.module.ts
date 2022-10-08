import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Details } from './entity/details.entity';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';

@Module({
  imports: [TypeOrmModule.forFeature([Details])],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
