import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DriverModule } from './../src/driver/driver.module';

describe('(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DriverModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('AppController', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Drivers API .. TODO SWAGGER');
    });
  });
  describe('DriverController', () => {
    it('/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/driver/ping')
        .expect(200)
        .expect('{"message":"received"}');
    });
  });
});
