import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './interfaces/driver.interface';
import CreateDriverDTO from './dto/driver.dto'


@Injectable()
export class DriverService {
  constructor(@InjectModel('Driver') private readonly driverModel: Model<Driver>) {

  }

  async getDrivers(): Promise<Driver[]>{
    const drivers = await this.driverModel.find({})
    return drivers;
  }
  async getDriver(driverID: string): Promise<Driver>{
    const driver = await this.driverModel.findById(driverID);
    return driver;
  }
  async createDriver(createDriverDTO: CreateDriverDTO): Promise<Driver>{
    const driver = new this.driverModel(createDriverDTO);
    return await driver.save();
  }
  async deleteDriver(driverID: string): Promise<Driver>{
    const driver = await this.driverModel.findByIdAndDelete(driverID);
    return driver;
  }
  async updateDriver(driverID: string, createDriverDTO: CreateDriverDTO): Promise<Driver>{
    const driver = await this.driverModel.findByIdAndUpdate(driverID, createDriverDTO, {useFindAndModify: false, new: true});
    return driver;
  }
}
