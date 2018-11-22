
// 分页信息
export class PageInfo{
  curPage: number = 1;
  total: number = 0;
  perPage: number = 10;
  totalPage: number = 0;
  count: number = 0;
}

export interface IPageInfo{
  curPage: number
  total: number
  perPage: number 
  totalPage: number
  count: number
}