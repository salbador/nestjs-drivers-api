import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query, BadGatewayException  } from '@nestjs/common';
import CreateDriverDTO from '../driver/dto/driver.dto';

import { DriverService } from '../driver/driver.service';


@Controller('driver')
export class DriverController {
  constructor(private driverService: DriverService) {  }
  @Post('/ping')
  pingPost(@Res() res)  {
    return res.status(HttpStatus.OK).json({
      message: 'received'
    })
  }


  @Post('/create')
  async createPost(@Res() res, @Body() createDriverDTO: CreateDriverDTO)  {
    // console.log(createDriverDTO);
    const driver = await this.driverService.createDriver(createDriverDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'received',
      driver: driver
    })
  }

  @Get('/all')
  async allGet(@Res() res)  {
    const drivers = await this.driverService.getDrivers();
    if (!drivers) throw new NotFoundException();
    return res.status(HttpStatus.FOUND).json({
      drivers
    })
  }

  @Post('/all')
  async allPost(@Res() res)  {
    const drivers = await this.driverService.getDrivers();
    if (!drivers) throw new NotFoundException();
    return res.status(HttpStatus.FOUND).json({
      drivers
    })
  }

  @Get('/:driverID')
  async driverGet(@Res() res, @Param('driverID') driverID)  {
    const driver = await this.driverService.getDriver(driverID);
    if (!driver) throw new NotFoundException(driverID);
    return res.status(HttpStatus.FOUND).json({
      driver
    })
  }

  @Post('/:driverID')
  async driverPost(@Res() res, @Param('driverID') driverID)  {
    const driver = await this.driverService.getDriver(driverID);
    if (!driver) throw new NotFoundException(driverID);
    return res.status(HttpStatus.FOUND).json({
      driver
    })
  }

  @Put('/:driverID')
  async driverPut(@Res() res, @Param('driverID') driverID, @Body() createDriverDTO: CreateDriverDTO)  {
    const driver = await this.driverService.updateDriver(driverID, createDriverDTO);
    if (!driver) throw new NotFoundException(driverID);
    return res.status(HttpStatus.FOUND).json({
      driver
    })
  }

  // TODO: Disabled using Query since it shows errror
  //       Cast to ObjectId failed for value "update" at path "_id" for model "Driver"
  // @Put('/update')
  // async updatePut(@Res() res, @Query('driverID') driverID, @Body() createDriverDTO: CreateDriverDTO)  {
  //   const driver = await this.driverService.updateDriver(driverID, createDriverDTO);
  //   if (!driver) throw new NotFoundException(driverID);
  //   return res.status(HttpStatus.FOUND).json({
  //     driver
  //   })
  // }

  @Delete('/:driverID')
  async driverDelete(@Res() res, @Param('driverID') driverID)  {
    const driver = await this.driverService.deleteDriver(driverID);
    if (!driver) throw new NotFoundException(driverID);
    return res.status(HttpStatus.FOUND).json({
      driver
    })
  }

  // TODO: Disabled using Query since it shows errror
  //       Cast to ObjectId failed for value "update" at path "_id" for model "Driver"
  // @Delete('/delete')
  // async deleteDelete(@Res() res, @Query('driverID') driverID)  {
  //   // console.log(driverID);
  //   if (!driverID.match(/^[0-9a-fA-F]{24}$/)) {
  //     throw new BadGatewayException(driverID);
  //   }
  //   const driver = await this.driverService.deleteDriver(driverID);
  //   if (!driver) throw new NotFoundException(driverID);
  //   return res.status(HttpStatus.FOUND).json({
  //     driver
  //   })
  // }

}
