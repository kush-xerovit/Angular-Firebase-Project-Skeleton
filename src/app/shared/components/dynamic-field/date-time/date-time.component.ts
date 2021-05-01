import { AfterContentChecked, Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'
import * as moment from 'moment'

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnInit, AfterContentChecked {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel

  selectedDate: Date = null

  showPicker = false

  flag = true

  constructor() {}

  ngOnInit() {}

  ngAfterContentChecked() {
    if (
      this.flag &&
      this.formGroup.value[this.field.name] !== null &&
      typeof this.formGroup.value[this.field.name] !== 'string'
    ) {
      this.onPopupChange(
        new Date(this.formGroup.value[this.field.name].seconds * 1000)
      )
      this.flag = false
    }
  }

  onPopupChange(val: Date) {
    this.selectedDate = val
    const showDate = moment(val).format('D/MM/YYYY h:mm a')
    this.formGroup.get(this.field.name).setValue(showDate)
  }

  onFocus($event: any) {
    $event.stopPropagation()
    $event.preventDefault()
    this.field.showPicker = true
    this.showPicker = true
  }
}
