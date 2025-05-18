import { Controller, Get } from '@nestjs/common';
import { TreeService } from './tree.service';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get()
  async getTrees() {
    const result = this.treeService.getTrees();

    return result;
  }
}
