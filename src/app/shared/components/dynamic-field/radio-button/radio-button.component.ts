import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel

  constructor() {}

  ngOnInit() {}
}
