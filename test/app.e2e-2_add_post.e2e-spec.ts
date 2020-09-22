import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DriverModule } from './../src/driver/driver.module';
import CreateDriverDTO from './../src/driver/dto/driver.dto';
import 'dotenv/config';

let driverId: string;
const driver: CreateDriverDTO = {
  name: "laptop",
  description: "Dell Laptop",
  imageURL: "http:localhost/driver_image.png",
  price: 1000,
  createdAt: new Date()
};
const driver2: CreateDriverDTO = {
  name: "mouse",
  description: "Mouse Razer",
  imageURL: "http:localhost/driver_image.png",
  price: 50,
  createdAt: new Date()
};
const driver3: CreateDriverDTO = {
  name: "Monitor",
  description: "Samsung Monitor",
  imageURL: "http:localhost/driver_image.png",
  price: 150,
  createdAt: new Date()
};

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
        .get('/').expect(HttpStatus.OK)
        .expect('Drivers API .. TODO SWAGGER');
    });
  });
  describe('DriverController', () => {
    it('/notfound (GET)', () => request(app.getHttpServer()).get('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (POST)', () => request(app.getHttpServer()).post('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (PUT)', () => request(app.getHttpServer()).put('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (PATCH)', () => request(app.getHttpServer()).patch('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (DELETE)', () => request(app.getHttpServer()).delete('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/driver/ping').expect(HttpStatus.OK)
        .expect('{"message":"received"}');
    });

    it('/.../create (POST)', () => {
      return request(app.getHttpServer())
        .post('/driver/create')
        .send(driver).expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.driver).toBeDefined();
          expect(body.driver._id).toBeDefined();
          driverId = body.driver._id;
          expect(body.driver.name).toEqual(driver.name);
          expect(body.driver.description).toEqual(driver.description);
          expect(body.driver.price).toEqual(driver.price);
          expect(body.driver.createdAt).toBeDefined();
        })
    });
    it('/.../all (POST)', () => {
      return request(app.getHttpServer())
        .post('/driver/all')
        .expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.drivers).toBeDefined();
          // console.log(res.body.drivers);
          const drivers: any = body.drivers;
          expect(drivers[0]._id).toBeDefined();
          driverId = drivers[0]._id;
          expect(drivers[0].name).toBeDefined();
          expect(drivers[0].description).toBeDefined();
          expect(drivers[0].price).toBeDefined();
          expect(drivers[0].createdAt).toBeDefined();
        })
    });
    it('/.../all (GET)', () => {
      return request(app.getHttpServer())
        .get('/driver/all')
        .expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.drivers).toBeDefined();
          // console.log(res.body.drivers);
          const drivers: any = body.drivers;
          expect(drivers[0]._id).toBeDefined();
          driverId = drivers[0]._id;
          expect(drivers[0].name).toBeDefined();
          expect(drivers[0].description).toBeDefined();
          expect(drivers[0].price).toBeDefined();
          expect(drivers[0].createdAt).toBeDefined();
        })
    });
    it('/.../:driverID not found (GET)', () =>
      request(app.getHttpServer()).get('/driver/5ca76cffc2b185489f4bd123').expect(HttpStatus.NOT_FOUND));
    it('/.../:driverID (GET)', () => {
      // console.log(driverId);
      return request(app.getHttpServer())
        .get('/driver/' + driverId ).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.driver).toBeDefined();
          expect(body.driver._id).toBeDefined();
          driverId = body.driver._id;
          expect(body.driver.name).toBeDefined();
          expect(body.driver.description).toBeDefined();
          expect(body.driver.price).toBeDefined();
          expect(body.driver.createdAt).toBeDefined();
        })
    });
    it('/.../:driverID not found (POST)', () =>
      request(app.getHttpServer()).post('/driver/5ca76cffc2b185489f4bd123').expect(HttpStatus.NOT_FOUND));
    it('/.../:driverID (POST)', () => {
      // console.log(driverId);
      return request(app.getHttpServer())
        .post('/driver/' + driverId ).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.driver).toBeDefined();
          expect(body.driver._id).toBeDefined();
          driverId = body.driver._id;
          expect(body.driver.name).toBeDefined();
          expect(body.driver.description).toBeDefined();
          expect(body.driver.price).toBeDefined();
          expect(body.driver.createdAt).toBeDefined();
        })
    }); // it
    it('/.../:driverID (PUT)', () => {
      // console.log(driverId);
      return request(app.getHttpServer())
        .put('/driver/' + driverId )
        .send(driver2).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.driver).toBeDefined();
          expect(body.driver._id).toBeDefined();
          driverId = body.driver._id;
          expect(body.driver.name).toBeDefined();
          expect(body.driver.name).toEqual(driver2.name);
          expect(body.driver.description).toBeDefined();
          expect(body.driver.description).toEqual(driver2.description);
          expect(body.driver.price).toBeDefined();
          expect(body.driver.createdAt).toBeDefined();
        })
    }); // it
    it('/.../:driverID check put again (GET)', () => {
      // console.log(driverId);
      return request(app.getHttpServer())
        .get('/driver/' + driverId )
        .expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.driver).toBeDefined();
          expect(body.driver._id).toBeDefined();
          driverId = body.driver._id;
          expect(body.driver.name).toBeDefined();
          expect(body.driver.name).toEqual(driver2.name);
          expect(body.driver.description).toBeDefined();
          expect(body.driver.description).toEqual(driver2.description);
          expect(body.driver.price).toBeDefined();
          expect(body.driver.createdAt).toBeDefined();
        })
    }); // it
    // TODO: Disabled using Query since it shows errror
    //       Cast to ObjectId failed for value "update" at path "_id" for model "Driver"
    // it('/.../update?driverID= (PUT)', () => {
    //   // console.log(driverId);
    //   return request(app.getHttpServer())
    //     .put('/driver/update?driverID=' + driverId )
    //     .send(driver3).expect(HttpStatus.FOUND)
    //     .expect((res) => {
    //       expect(res.headers).toBeDefined();
    //       expect(res.text).toBeDefined();
    //       expect(res.body).toBeDefined();
    //       const body: any = JSON.parse(res.text);
    //       expect(body).toBeDefined();
    //       expect(body.driver).toBeDefined();
    //       expect(body.driver._id).toBeDefined();
    //       driverId = body.driver._id;
    //       expect(body.driver.name).toBeDefined();
    //       expect(body.driver.name).toEqual(driver3.name);
    //       expect(body.driver.description).toBeDefined();
    //       expect(body.driver.description).toEqual(driver3.description);
    //       expect(body.driver.price).toBeDefined();
    //       expect(body.driver.createdAt).toBeDefined();
    //     })
    // }); // it
    it('/.../:driverID (DELETE)', () => {
      // console.log(driverId);
      return request(app.getHttpServer())
        .delete('/driver/' + driverId ).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.driver).toBeDefined();
          expect(body.driver._id).toBeDefined();
          driverId = body.driver._id;
          expect(body.driver.name).toBeDefined();
          expect(body.driver.description).toBeDefined();
          expect(body.driver.price).toBeDefined();
          expect(body.driver.createdAt).toBeDefined();
        })
    }); // it
    it('/.../:driverID not found (DELETE)', () =>
      request(app.getHttpServer()).delete('/driver/' + driverId).expect(HttpStatus.NOT_FOUND));
    // TODO: Disabled using Query since it shows errror
    //       Cast to ObjectId failed for value "update" at path "_id" for model "Driver"
    // it('/.../create again (POST)', () => {
    //   return request(app.getHttpServer())
    //     .post('/driver/create')
    //     .send(driver).expect(HttpStatus.CREATED)
    //     .expect((res) => {
    //       expect(res.text).toBeDefined();
    //       const body: any = JSON.parse(res.text);
    //       expect(body).toBeDefined();
    //       expect(body.driver).toBeDefined();
    //       expect(body.driver._id).toBeDefined();
    //       driverId = body.driver._id;
    //     })
    // }); // it
    // TODO: Disabled using Query since it shows errror
    //       Cast to ObjectId failed for value "update" at path "_id" for model "Driver"
    // it('/.../delete?driverID= again (DELETE)', () => {
    //   console.log(driverId);
    //   return request(app.getHttpServer())
    //     .delete('/driver/delete?driverID=' + driverId )
    //     .expect(HttpStatus.FOUND)
    //     .expect((res) => {
    //       expect(res.headers).toBeDefined();
    //       expect(res.text).toBeDefined();
    //       expect(res.body).toBeDefined();
    //       const body: any = JSON.parse(res.text);
    //       expect(body).toBeDefined();
    //       expect(body.driver).toBeDefined();
    //       expect(body.driver._id).toBeDefined();
    //       driverId = body.driver._id;
    //       expect(body.driver.name).toBeDefined();
    //       expect(body.driver.description).toBeDefined();
    //       expect(body.driver.price).toBeDefined();
    //       expect(body.driver.createdAt).toBeDefined();
    //     })
    // }); // it
    // TODO: Disabled using Query since it shows errror
    //       Cast to ObjectId failed for value "update" at path "_id" for model "Driver"
    // it('/.../delete?driverID= again not found (DELETE)', () =>
    //   request(app.getHttpServer()).delete('/driver/delete?driverID=' + driverId).expect(HttpStatus.NOT_FOUND));

  });
});
