import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'shortDateTime',
})
export class ShortDateTimePipe implements PipeTransform {
  transform(value: any, format?: string) {
    if (value == null) {
      return ''
    } //
    if (!format) format = 'D/MM/YYYY h:mm a'
    return moment(new Date(value)).format(format)
  }
}
