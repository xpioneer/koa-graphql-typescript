
// 分页信息
export class PageInfo{
  cur_page: number = 1;
  total: number = 0;
  per_page: number = 10;
  total_page: number = 0;
  count: number = 0;
}

export interface IPageInfo{
  cur_page: number
  total: number
  per_page: number 
  total_page: number
  count: number
}