import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel
  constructor() {}

  ngOnInit() {}
}
