import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { DriversController } from './../src/driver/driver.controller';
import { DriverModule } from './../src/driver/driver.module';
import CreateDriverDTO from './../src/driver/dto/driver.dto';
// import CreateDriverDTO from './../src/driver/dto/driver.dto';
import 'dotenv/config';

export const app = `http://localhost:${process.env.PORT}/api`;

export const database = process.env.MONGO_URI;

let sellerToken: string;
// let driverSeller: CreateDriverDTO = {
  // seller: true,
  // username: 'driverSeller',
  // password: 'password',
// };
beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  const {
    data: { token },
  } = await axios.post(`${app}/auth/register`);

  sellerToken = token;
});

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
        .expect('Hello World!');
    });
  });
  describe('DriverController', () => {
    it('/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/driver/ping')
        .expect(200)
        .expect('{"message":"received"}');
    });
    it('/create (POST)', () => {
      const driver: CreateDriverDTO = {
        name: "laptop",
        description: "Dell Laptop",
        imageURL: "http:localhost/driver_image.png",
        price: 1000,
        createdAt: new Date()
      };
      return request(app.getHttpServer())
        .post('/driver/create')
        .set('Authorization', `Bearer ${sellerToken}`)
        .set('Accept', 'application/json')
        .send(driver)
        .expect(200)
        .expect('{"message":"received"}');
    });
  });
});
