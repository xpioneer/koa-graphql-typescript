
import { PageInfo, IPageInfo } from './PageInfo'

export class ResponseData<T = any>{
  /**
   * client use
   */
  public data: T;
  public msg?: string;
  public status?: number;
  /**
   * pager info
   */
  public meta?: PageInfo;
  public errors?: string[];
  // [key: string]: any
}

export interface ReturnPage<T = any> extends Partial<Omit<ResponseData<T>, 'data'>> {
  list: T[]
  total: number
}
