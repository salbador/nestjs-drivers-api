import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Drivers API .. TODO SWAGGER';
  }
}
