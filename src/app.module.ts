import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { MongooseModule } from '@nestjs/mongoose'
import 'dotenv/config';

// Make sure to create .env file with
// something like this:
// MONGO_URI='mongodb://localhost:27017/10-fatzcode-restbe-drivers'

@Module({
  imports: [
    DriverModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {useNewUrlParser: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
