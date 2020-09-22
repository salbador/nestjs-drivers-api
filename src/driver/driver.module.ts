import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './schemas/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Driver', schema: DriverSchema}
    ])
  ],
  controllers: [DriverController],
  providers: [DriverService]
})
export class DriverModule {}
