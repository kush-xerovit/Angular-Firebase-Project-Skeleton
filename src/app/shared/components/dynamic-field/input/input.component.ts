import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel

  constructor() {}

  ngOnInit() {}

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode
    if (
      charCode > 31 &&
      (charCode < 48 || charCode > 57) &&
      (charCode < 96 || charCode > 105)
    )
      return false
    else {
      if (charCode === 48) return event.target.value ? true : false
      else if (charCode === 46) return false
      else if (charCode >= 96 && charCode <= 105) return true
      return true
    }
  }
}
