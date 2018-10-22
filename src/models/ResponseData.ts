
import { PageInfo, IPageInfo } from './PageInfo'


export class ResponseData{
  public data: any;
  public msg: string;
  public status: number;
  public meta?:PageInfo;
  public errors?: string[];
}


export interface IResponseData{
  data: any,
  msg: string,
  status: number,
  meta?: IPageInfo,
  errors?: string[]
}