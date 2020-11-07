
import { PageInfo, IPageInfo } from './PageInfo'

export class ResponseData<T = any>{
  /**
   * client use
   */
  public data: T;
  public msg: string;
  public status: number;
  /**
   * pager info
   */
  public meta?:PageInfo;
  public errors?: string[];
  [key: string]: any
}


interface IBaseResponse {
  msg?: string
  status?: number
  errors?: string[]
  [key: string]: any
}

export interface IResponseData<T = any> extends IBaseResponse {
  data: T
  meta?: IPageInfo
}

export interface IReturnPage<T = any> extends IBaseResponse {
  list: T[]
  total: number
}
