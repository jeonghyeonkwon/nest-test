import { TreeType } from './tree-type.enum';

export class Tree {
  id: string;
  parentId: string;
  name: string;
  userId: string;
  treeType: TreeType;
  trees: Tree[];
}
