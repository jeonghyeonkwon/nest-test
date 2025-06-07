import { Controller, Get, Query } from '@nestjs/common';
import { SeparationService } from './separation.service';

@Controller('separation')
export class SeparationController {
  constructor(private readonly separationService: SeparationService) {}

  @Get('/count')
  async getCount() {
    //const result = await this.separationService.getCount();
    const result = await this.separationService.getCountVer2();

    return result;
  }

  @Get()
  async getList(@Query('page') page: string, @Query('size') size: string) {
    const pageNumber = parseInt(page, 10);
    const sizeNumber = parseInt(size, 10);

    const result = await this.separationService.getList(pageNumber, sizeNumber);
    return result;
  }
}
