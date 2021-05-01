import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel
  constructor() {}

  ngOnInit() {}
}
