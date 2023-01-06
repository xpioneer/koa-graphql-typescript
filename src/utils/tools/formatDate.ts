import { format } from 'date-fns'
import { DateFormat } from '@/types/base'


export const formatDate = (date: number | Date, formatStr = DateFormat.DateTime) => {
  try {
    return format(date, formatStr)
  } catch(e) {
    return format(new Date, formatStr)
  }
}