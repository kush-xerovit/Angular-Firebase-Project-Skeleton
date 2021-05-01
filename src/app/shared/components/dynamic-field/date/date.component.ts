import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'
import * as moment from 'moment'

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel

  constructor() {}

  ngOnInit() {
    if (this.formGroup.value[this.field.name] !== null) {
      if (this.formGroup.value[this.field.name].seconds === undefined) {
        this.formGroup
          .get(this.field.name)
          .setValue(
            new Date(
              moment(
                this.formGroup.value[this.field.name],
                'DD/MM/YYYY'
              ).format('LLLL')
            )
          )
      } else
        this.formGroup
          .get(this.field.name)
          .setValue(
            new Date(this.formGroup.value[this.field.name].seconds * 1000)
          )
    }
  }

  doChangeDate(event) {
    if (this.field.name === 'startDate' || this.field.name === 'endDate') {
      if (this.field.name === 'startDate') {
        if (this.formGroup.get('endDate').value) {
          const endDate = moment(this.formGroup.get('endDate').value)
            .startOf('day')
            .toDate()
          if (endDate < this.formGroup.get(this.field.name).value) {
            this.formGroup.get('endDate').setValue(null)
          }
        }
      } else {
        if (this.formGroup.get('startDate').value) {
          const startDate = moment(this.formGroup.get('startDate').value)
            .startOf('day')
            .toDate()
          if (startDate > this.formGroup.get(this.field.name).value) {
            this.formGroup.get(this.field.name).setValue(null)
          }
        }
      }
    }
    //  else {
    //   const selectedDate = moment(event).startOf('day').toDate();
    //   this.formGroup.get(this.field.name).setValue(selectedDate);
    // }
  }
}
