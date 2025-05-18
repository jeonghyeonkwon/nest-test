import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_TOKEN } from 'src/config/knex.module';
import { Tree } from './tree.entity';

@Injectable()
export class TreeService {
  constructor(@Inject(KNEX_TOKEN) private readonly knex: Knex) {}

  async getTrees(): Promise<Tree[]> {
    const result = await this.knex('trees').select<Tree[]>([
      'id',
      'parent_id as parentId',
      'name',
      'user_id as userId',
      'tree_type as treeType',
    ]);

    const build = await this.buildTree(result, 'id', 'parentId', 'trees');
    return build;
  }
  async buildTree(
    list: Tree[],
    idColumn: string,
    parentIdColumn: string,
    childrenKey: string,
  ) {
    const map = {};
    list.forEach((item) => {
      map[item[idColumn]] = { ...item, [childrenKey]: [] };
    });
    console.log(map);
    const tree: Tree[] = [];

    list.forEach((item) => {
      const parentId = item[parentIdColumn];

      if (parentId !== null && parentId !== undefined && map[parentId]) {
        map[parentId][childrenKey].push(map[item[idColumn]]);
      } else {
        tree.push(map[item[idColumn]]);
      }
    });
    return tree;
  }
}
