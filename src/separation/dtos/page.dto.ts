export class PagenationDtosV1<T> {
  isFirst: boolean;
  isLast: boolean;
  currentPage: number;
  startBlockPage: number;
  endBlockPage: number;
  totalPage: number;
  size: number;
  list: T[];

  constructor(
    totalCount: number,
    list: T[],
    page: number,
    size: number,
    perPage: number,
  ) {
    this.totalPage = totalCount;
    this.list = list;
    this.size = size;
    this.currentPage = page;
    this.totalPage = Math.ceil(totalCount / perPage);
    this.startBlockPage = Math.floor((page - 1) / perPage) * perPage + 1;
    this.endBlockPage = Math.min(
      this.startBlockPage + perPage - 1,
      this.totalPage,
    );
    this.isFirst = page === 1 ? false : true;
    this.isLast = this.totalPage > page ? true : false;
  }
}
