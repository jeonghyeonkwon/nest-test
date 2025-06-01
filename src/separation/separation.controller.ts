import { Controller, Get } from '@nestjs/common';
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
}
